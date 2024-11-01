import { Injectable } from '@nestjs/common';
import { CreateOfertDto } from './dto/create-ofert.dto';
import { UpdateOfertDto } from './dto/update-ofert.dto';

@Injectable()
export class OfertsService {
  create(createOfertDto: CreateOfertDto) {
    return 'This action adds a new ofert';
  }

  findAll() {
    return `This action returns all oferts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ofert`;
  }

  update(id: number, updateOfertDto: UpdateOfertDto) {
    return `This action updates a #${id} ofert`;
  }

  remove(id: number) {
    return `This action removes a #${id} ofert`;
  }
}
