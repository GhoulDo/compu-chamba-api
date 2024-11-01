import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaService } from 'src/libs/prisma/prisma.service';

@Injectable()
export class CompaniesService {
  constructor(readonly prismaService: PrismaService) { }

  async create(createCompanyDto: CreateCompanyDto) {
    try {
      return await this.prismaService.company.create({
        data: {
          ...createCompanyDto
        }
      });
    } catch (error) {
      if (error.code === 'P2003') {
        throw new BadRequestException({
          error: 'Error constraint violation(RoleID not found)',
          message: error.meta,
        });
      } else if (error.code == 'P2002') {
        throw new BadRequestException({
          error: 'Error constraint violation(Email already exists)'
        })
      }
    }
  }


  async findAll() {
    return await this.prismaService.company.findMany();
  }

  async findOne(id: string) {
    const exists = await this.prismaService.company.findUnique({ where: { id } });
    if (!exists) {
      throw new NotFoundException("Error Company Not Found")
    }
    return exists;
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    await this.findOne(id);
    return await this.prismaService.company.update({
      where: { id }, data: {
        ...updateCompanyDto
      }
    })
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prismaService.company.delete({ where: { id } })
    return "user has been delete"
  }
}
