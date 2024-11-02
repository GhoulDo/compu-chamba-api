import { IsEmail, IsNotEmpty, IsString, IsUUID, MaxLength, MinLength } from "class-validator";


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
    @MaxLength(50)
    @MinLength(8)
    password : string;

    @IsUUID()
    @IsNotEmpty()
    RoleId : string;



}
