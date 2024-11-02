import { IsString, IsUUID } from 'class-validator';

export class CreateApplicationDto {
  @IsString()
  @IsUUID()
  userId: string;

  @IsString()
  @IsUUID()
  ofertId: string;
}
