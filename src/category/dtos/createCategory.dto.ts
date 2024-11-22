import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  name: string;
  @IsNumber()
  number: number;
  created_at: Date;
  updated_at: Date;
}
