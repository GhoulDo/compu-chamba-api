import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, HttpCode } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post()
  async create(@Body() createApplicationDto: CreateApplicationDto) {
    return await this.applicationsService.create(createApplicationDto);
  }

  @Get()
  async findAll() {
    return await this.applicationsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id',ParseUUIDPipe) id: string) {
    return await this.applicationsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id',ParseUUIDPipe) id: string, @Body() updateApplicationDto: UpdateApplicationDto) {
    return await this.applicationsService.update(id, updateApplicationDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id',ParseUUIDPipe) id: string) {
    return await this.applicationsService.remove(id);
  }
}
