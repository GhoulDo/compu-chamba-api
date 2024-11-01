import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { PrismaService } from 'src/libs/prisma/prisma.service';

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService,PrismaService],
})
export class CompaniesModule {}
