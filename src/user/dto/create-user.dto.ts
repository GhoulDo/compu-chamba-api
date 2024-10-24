import { IsEmail, IsNotEmpty, IsString, IsUUID } from "class-validator";


export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name : string;

    @IsNotEmpty()
    @IsEmail()
    email : string; 

    @IsString()
    password : string;

    @IsUUID()
    @IsNotEmpty()
    RoleId : string;



}
