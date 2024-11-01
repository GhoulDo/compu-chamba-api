import { PartialType } from '@nestjs/mapped-types';
import { CreateOfertDto } from './create-ofert.dto';

export class UpdateOfertDto extends PartialType(CreateOfertDto) {}
