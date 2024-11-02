import { Response } from 'express';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { error } from 'console';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.prismaService.user.create({
        data: {
          ...createUserDto,
          RoleId: '37920b5b-7c86-4f60-91e6-3089e07c72aa',
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
}
