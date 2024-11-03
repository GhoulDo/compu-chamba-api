import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { passHash } from 'src/common/utils/passHash';

@Injectable()
export class CompaniesService {
  constructor(readonly prismaService: PrismaService) {}

  async create(createCompanyDto: CreateCompanyDto) {
    try {
      return await this.prismaService.company.create({
        data: {
          ...createCompanyDto,
          RoleId: process.env.ROLE_COMPANY,
          password:await passHash(createCompanyDto.password)
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


      throw new InternalServerErrorException('An unexpected error an ocurred');
    }
  }

  async findAll() {
    try {
      return await this.prismaService.company.findMany();
    } catch (error) {
      throw new InternalServerErrorException('An unexpected error an ocurred');
    }
  }

  async findOne(id: string) {
    try {
      const exists = await this.prismaService.company.findUnique({
        where: { id },
        include: { oferts: true },
      });
      if (!exists) {
        throw new NotFoundException('Error Company Not Found');
      }
      return exists;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('An unexpected error an ocurred');
    }
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    await this.findOne(id);
    try {
      return await this.prismaService.company.update({
        where: { id },
        data: {
          ...updateCompanyDto,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('An unexpected error an ocurred');
    }
  }

  async remove(id: string) {
    await this.findOne(id);
    try {
      await this.prismaService.company.delete({ where: { id } });
      return;
    } catch (error) {
      throw new InternalServerErrorException('An unexpected error an ocurred');
    }
  }

  async findByEmail(email: string) {
    try {
      const exists = await this.prismaService.company.findUnique({
        where: { email },
        select: {
          email: true,
          password: true,
          RoleId: true,
          name: true,
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
