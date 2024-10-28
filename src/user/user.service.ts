import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/libs/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create({ email, password, name, RoleId,gender }: CreateUserDto) {
    try {
      return await this.prismaService.user.create({
        data: {
          email,
          password,
          name,
          gender,
          RoleId,
        },
      });
    } catch (error) {
      console.log(error);
      if (error.code === 'P2003') {
        throw new BadRequestException({
          error: 'Error constraint violation(RoleID not found)',
          message: error.meta,
        });
      }else if(error.code == 'P2002'){
        throw new BadRequestException({
          error:'Error constraint violation(Email already exists)'
        })
      }
    }
  }

  async findAll() {
    return await this.prismaService.user.findMany();
  }

  async findOne(id: string) {
   const exists = await this.prismaService.user.findUnique({
      where: {
        id: id
      },
    });
    if (!exists) {
      throw new NotFoundException({
        error: 'User not found',
        message: 'User with the provided ID not found',
      });
    }
    return exists;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return null;
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prismaService.user.delete({where:{id}})
    return "User has been deleted";
  }
}
