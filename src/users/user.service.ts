import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { passHash } from 'src/common/utils/passHash';

@Injectable()
export class UserService {
  private s3: AWS.S3;

  constructor(private readonly prismaService: PrismaService) {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
  }

  async uploadFile(file: Express.Multer.File, id: string): Promise<string> {
    const fileKey = `${uuidv4()}-${file.originalname}`;

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    try {
      await this.s3.upload(params).promise();
      const file = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;
      await this.prismaService.user.update({
        where: { id },
        data: {
          video: file,
        },
      });
      return file;
    } catch (error) {
      throw new Error(`Failed to upload file: ${error.message}`);
    }
  }

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.prismaService.user.create({
        data: {
          ...createUserDto,
          RoleId: process.env.ROLE_USER,
          password: await passHash(createUserDto.password),
        },
        select: {
          email: true,
          password: false,
          name: true,
          lastname: true,
        },
      });
    } catch (error) {
      if (error.code === 'P2003') {
        throw new BadRequestException({
          error: 'Error constraint violation(RoleID not found)',
          message: error.meta,
        });
      } else if (error.code == 'P2002') {
        throw new BadRequestException({
          error: 'Error constraint violation(Email already exists)',
        });
      }

      if (error instanceof BadRequestException) {
        throw error;
      }
      console.log(error);
      throw new InternalServerErrorException('An unexpected error an ocurred');
    }
  }

  async findAll() {
    try {
      return await this.prismaService.user.findMany();
    } catch (error) {
      throw new InternalServerErrorException('An unexpected error an ocurred ');
    }
  }

  async findOne(id: string) {
    try {
      const exists = await this.prismaService.user.findUnique({
        where: {
          id: id,
        },
      });
      if (!exists) {
        throw new NotFoundException({
          error: 'User not found',
          message: 'User with the provided ID not found',
        });
      }
      return exists;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException('An unexpected error an ocurred');
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findOne(id);
    try {
      return await this.prismaService.user.update({
        where: { id },
        data: {
          ...updateUserDto,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('An unexpected error an ocurred');
    }
  }

  async remove(id: string) {
    await this.findOne(id);
    try {
      await this.prismaService.user.delete({ where: { id } });
      return;
    } catch (error) {
      throw new InternalServerErrorException('An unexpected error an ocurred');
    }
  }

  async findByEmail(email: string) {
    try {
      const exists = await this.prismaService.user.findUnique({
        where: { email },
        select: {
          id:true,
          email: true,
          password: true,
          RoleId: true,
          name: true,
          lastname: true,
        },
      });

      if (!exists) {
        throw new UnauthorizedException('Error email not Found');
      }

      return exists;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      throw new InternalServerErrorException('An unexpected error ocurred');
    }
  }
}
