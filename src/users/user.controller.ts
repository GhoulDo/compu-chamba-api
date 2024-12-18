import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, HttpCode, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from 'src/common/decorators/auth.decorator';
import { Role } from 'src/common/enums/role.enum';
import { FileInterceptor } from '@nestjs/platform-express';

//@Auth(Role.ADMIN)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }
  
  @Get(':id')
  async findOne(@Param('id',ParseUUIDPipe) id: string) {
    return await this.userService.findOne(id);
  }
  
  @Patch(':id')
  async update(@Param('id',ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }
  
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id',ParseUUIDPipe) id: string) {
    return await this.userService.remove(id);
  }
  
  @Post('/video/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadVideo(@UploadedFile() file: Express.Multer.File, @Param('id') id : string): Promise<string> {
    return this.userService.uploadFile(file,id);
  }
}
