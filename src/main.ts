import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Elimina propiedades no declaradas en los DTO
    forbidNonWhitelisted: true, // Lanza error si hay propiedades no declaradas
    transform: true, // Transforma la entrada según el tipo definido en el DTO
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
