import {
    IsEmail,
    IsEmpty,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
    MaxLength,
    MinLength,
  } from 'class-validator';
  
  export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsString()
    @IsNotEmpty()
    lastname: string;
  
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @IsString()
    @IsOptional()
    video: string;
  
    @IsString()
    @IsOptional()
    experience: string;
  
    @IsNotEmpty()
    @IsString()
    gender: string;
  
    @IsOptional()
    @IsString()
    description : string;
  
    @IsString()
    @MaxLength(50)
    @MinLength(8)
    password: string;

  }
  