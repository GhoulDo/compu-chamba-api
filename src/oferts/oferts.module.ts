import { Module } from '@nestjs/common';
import { OfertsService } from './oferts.service';
import { OfertsController } from './oferts.controller';

@Module({
  controllers: [OfertsController],
  providers: [OfertsService],
})
export class OfertsModule {}
