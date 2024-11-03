import { Module } from '@nestjs/common';
import { OfertsService } from './oferts.service';
import { OfertsController } from './oferts.controller';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { PrismaModule } from 'src/libs/prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [OfertsController],
  providers: [OfertsService,PrismaService],
})
export class OfertsModule {}
