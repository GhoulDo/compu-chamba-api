import { IsEmail, IsNotEmpty, IsString, IsUUID, MaxLength, MinLength } from "class-validator"

export class CreateCompanyDto {
    @IsString()
    @IsNotEmpty()
    name : string

    @IsString()
    nit : string

    @IsEmail()
    @IsString()
    email : string

    @IsString()
    @MaxLength(20)
    @MinLength(8)
    password : string

    @IsUUID()
    @IsNotEmpty()
    RoleId : string;
}
