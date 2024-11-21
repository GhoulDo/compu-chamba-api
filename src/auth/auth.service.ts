import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/users/user.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from '../auth/dto/login.dto';
import { compare } from 'src/common/utils/passHash';
import { JwtService } from '@nestjs/jwt';
import { CompaniesService } from 'src/companies/companies.service';
import { CreateCompanyDto } from 'src/companies/dto/create-company.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly companiesService: CompaniesService,
  ) {}
  async register(createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  async login({ email, password }: LoginDto) {
    
    const user = await this.userService.findByEmail(email);
    const isPasswordValid = await compare(password, user.password);
    const id = user.id;
    

    if (!isPasswordValid) throw new UnauthorizedException('Password Incorrect');

    const payload = {
      email: user.email,
      RoleId: user.RoleId,
      user,
      id: user.id,
    };

    const token = await this.jwtService.signAsync(payload);
    return { email, token, id};
  }

  async registerCompanies(createCompanyDto: CreateCompanyDto) {
    return await this.companiesService.create(createCompanyDto);
  }

  async loginCompanies({ email, password }: LoginDto) {
    const user = await this.companiesService.findByEmail(email);
    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) throw new UnauthorizedException('Password Incorrect');

    const payload = { email: user.email, RoleId: user.RoleId };

    const token = await this.jwtService.signAsync(payload);
    return { email, token };
  }
}
