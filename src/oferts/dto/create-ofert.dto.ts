import { IsNotEmpty, IsString, IsUUID } from "class-validator"

export class CreateOfertDto {

    @IsString()
    @IsNotEmpty()
    title : string

    @IsString()
    @IsNotEmpty()
    description : string

    @IsString()
    @IsNotEmpty()
    salary : string

    @IsString()
    @IsNotEmpty()
    @IsUUID()
    companyId : string

    @IsString()
    @IsNotEmpty()
    schedule : string

    @IsString()
    @IsNotEmpty()
    modality : string

    @IsString()
    @IsNotEmpty()
    typeOfcontract : string

    @IsString()
    location : string
    
    @IsString()
    @IsNotEmpty()
    requeriments : string

    @IsString()
    @IsNotEmpty()
    experience : string

}
