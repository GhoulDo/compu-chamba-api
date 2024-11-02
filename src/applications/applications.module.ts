import { Module } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/libs/prisma/prisma.service';

@Module({
  controllers: [ApplicationsController],
  providers: [ApplicationsService,PrismaService],
})
export class ApplicationsModule {}
