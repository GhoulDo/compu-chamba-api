import {BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/libs/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create({email,password,name,RoleId}: CreateUserDto) {
    try{
      return await this.prismaService.user.create({
        data:{
          email,
          password,
          name,
          RoleId
        }
      })
    }catch(error){
      if(error.code === 'P2003'){
        throw new BadRequestException({
          error: 'Error constraint violation(RoleID not found)',  
          message: error.meta
        })
      }
    }
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  findOne(id: string) {
    return this.prismaService.user.findUnique({where:{id}});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
