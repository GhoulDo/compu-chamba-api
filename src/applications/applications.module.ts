import { Module } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { PrismaModule } from 'src/libs/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[PrismaModule],
  controllers: [ApplicationsController],
  providers: [ApplicationsService,PrismaService],
})
export class ApplicationsModule {}
