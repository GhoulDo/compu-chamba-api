import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, HttpCode } from '@nestjs/common';
import { OfertsService } from './oferts.service';
import { CreateOfertDto } from './dto/create-ofert.dto';
import { UpdateOfertDto } from './dto/update-ofert.dto';
import { Auth } from 'src/common/decorators/auth.decorator';
import { Role } from 'src/common/enums/role.enum';


@Auth(Role.COMPANY||Role.ADMIN)
@Controller('oferts')
export class OfertsController {
  constructor(private readonly ofertsService: OfertsService) {}

  @Post()
  async create(@Body() createOfertDto: CreateOfertDto) {
    return await this.ofertsService.create(createOfertDto);
  }

  @Get()
  async findAll() {
    return await this.ofertsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id',ParseUUIDPipe) id: string) {
    return await this.ofertsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id',ParseUUIDPipe) id: string, @Body() updateOfertDto: UpdateOfertDto) {
    return await this.ofertsService.update(id, updateOfertDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id',ParseUUIDPipe) id: string) {
    return this.ofertsService.remove(id);
  }
}
