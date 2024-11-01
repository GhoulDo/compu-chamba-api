import { IsEmail, IsNotEmpty, IsString, IsUUID } from "class-validator";


export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name : string;
    
    @IsString()
    @IsNotEmpty()
    lastname : string;
    

    @IsNotEmpty()
    @IsEmail()
    email : string; 

    @IsNotEmpty()
    @IsString()
    gender : string

    @IsString()
    password : string;

    @IsUUID()
    @IsNotEmpty()
    RoleId : string;



}
