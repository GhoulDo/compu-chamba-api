import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { CreateCompanyDto } from 'src/companies/dto/create-company.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('user/register')
  async register(@Body() data: CreateUserDto) {
    return await this.authService.register(data);
  }

  @Post('user/login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Post('companies/register')
  async registerCompanies(@Body() data: CreateCompanyDto) {
    return await this.authService.registerCompanies(data);
  }

  @Post('companies/login')
  async loginCompanies(@Body() loginDto: LoginDto) {
    return await this.authService.loginCompanies(loginDto);
  }
}
