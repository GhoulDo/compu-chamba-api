import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OfertsService } from './oferts.service';
import { CreateOfertDto } from './dto/create-ofert.dto';
import { UpdateOfertDto } from './dto/update-ofert.dto';

@Controller('oferts')
export class OfertsController {
  constructor(private readonly ofertsService: OfertsService) {}

  @Post()
  create(@Body() createOfertDto: CreateOfertDto) {
    return this.ofertsService.create(createOfertDto);
  }

  @Get()
  findAll() {
    return this.ofertsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ofertsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOfertDto: UpdateOfertDto) {
    return this.ofertsService.update(+id, updateOfertDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ofertsService.remove(+id);
  }
}
