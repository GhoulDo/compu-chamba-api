import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { CompaniesModule } from './companies/companies.module';
import { OfertsModule } from './oferts/oferts.module';


@Module({
  imports: [UserModule, CompaniesModule, OfertsModule],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule {}
