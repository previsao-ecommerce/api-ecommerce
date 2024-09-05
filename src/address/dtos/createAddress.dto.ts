import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  cep: string;
  @IsString()
  street: string;
  @IsNumber()
  number: number;
  @IsString()
  district: string;
  @IsString()
  city: string;
  @IsString()
  state: string;
  @IsOptional()
  @IsString()
  complement?: string;
  created_at: Date;
  updated_at: Date;
}
