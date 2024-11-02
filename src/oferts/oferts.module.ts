import { Module } from '@nestjs/common';
import { OfertsService } from './oferts.service';
import { OfertsController } from './oferts.controller';
import { PrismaService } from 'src/libs/prisma/prisma.service';

@Module({
  controllers: [OfertsController],
  providers: [OfertsService,PrismaService],
})
export class OfertsModule {}
