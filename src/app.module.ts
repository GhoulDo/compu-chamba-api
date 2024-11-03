import { Module } from '@nestjs/common';


import { UserModule } from './users/user.module';
import { CompaniesModule } from './companies/companies.module';
import { OfertsModule } from './oferts/oferts.module';
import { ApplicationsModule } from './applications/applications.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './libs/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [UserModule, CompaniesModule, OfertsModule, ApplicationsModule, AuthModule,PrismaModule,ConfigModule.forRoot({
    isGlobal: true, 
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
