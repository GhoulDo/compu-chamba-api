import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateOfertDto } from './dto/create-ofert.dto';
import { UpdateOfertDto } from './dto/update-ofert.dto';
import { PrismaService } from 'src/libs/prisma/prisma.service';

@Injectable()
export class OfertsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createOfertDto: CreateOfertDto) {
    try {
      return await this.prismaService.oferts.create({
        data: {
          ...createOfertDto,
        },
      });
    } catch (error) {
      console.log(error)
      throw new BadRequestException({
        message: 'An error occurred while creating the offer',
        error:error.meta
      });
      
    }
  }

  async findAll() {
    try {
      return await this.prismaService.oferts.findMany({
        include:{
          _count:true
        }
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while searching for the offer',
      );
    }
  }

  async findOne(id: string) {
    try {
      const exists = await this.prismaService.oferts.findUnique({
        where: { id },
      });
      if (!exists) throw new BadRequestException('Error: offer not found');
      return exists;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'An error occurred while fetching the offer',
      );
    }
  }

  async findByTitleAndLocation(title: string,location:string) {
    try {
      return await this.prismaService.oferts.findMany({
        where: {
          title: {
            contains: title,
          },
          location:{
            contains:location

          }
        },
      });
      
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while searching for offers by title',
      );
    }
  }

  async update(id: string, updateOfertDto: UpdateOfertDto) {
    await this.findOne(id);
    try {
      return await this.prismaService.oferts.update({
        where: { id },
        data: { ...updateOfertDto },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while updating the offer',
      );
    }
  }

  async remove(id: string) {
    await this.findOne(id);
    try {
      await this.prismaService.oferts.delete({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while deleting the offer',
      );
    }
  }
}
