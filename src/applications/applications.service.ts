import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { PrismaService } from 'src/libs/prisma/prisma.service';

@Injectable()
export class ApplicationsService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createApplicationDto: CreateApplicationDto) {
    try {
      return await this.prismaService.application.create({
        data: {
          ...createApplicationDto,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException({
          error:
            'Error constraint violation,You cannot apply twice for the same offer.',
          message: error.meta,
        });
      }else if(error.code === 'P2003'){
        throw new BadRequestException({
          error:
            'Error constraint violation, CompanyId or UserId not found.',
          message: error.meta,
        });
      }

      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'an error has occurred, an unexpected error',
      );
    }
  }

  async findAll() {
    try {
      return await this.prismaService.application.findMany();
    } catch (error) {
      throw new InternalServerErrorException(
        'an error has occurred, an unexpected error',
      );
    }
  }

  async findOne(id: string) {
    try {
      const exists = await this.prismaService.application.findUnique({
        where: { id },
      });
      if (!exists) {
        throw new NotFoundException('Error: application not found');
      }
      return exists;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'an error has occurred, an unexpected error',
      );
    }
  }

  async update(id: string, updateApplicationDto: UpdateApplicationDto) {
    await this.findOne(id);
    try {
      return await this.prismaService.application.update({
        where: { id },
        data: { ...updateApplicationDto },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'an error has occurred, an unexpected error',
      );
    }
  }

  async remove(id: string) {
    await this.findOne(id);
    try {
      await this.prismaService.application.delete({ where: { id } });
      return;
    } catch (error) {
      throw new InternalServerErrorException(
        'an error has occurred, an unexpected error',
      );
    }
  }
}
