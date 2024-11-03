import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/libs/prisma/prisma.module';
import { UserModule } from 'src/users/user.module';
import { JwtModule } from '@nestjs/jwt';
import { CompaniesModule } from 'src/companies/companies.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [PrismaModule,UserModule,CompaniesModule,JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '1d' },
  })],

})
export class AuthModule {}
