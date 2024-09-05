import { IsArray, IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsString()
  category_id?: string;
  @IsArray()
  images?: string[];
  @IsString()
  currency: string;
  @IsNumber()
  price: number;
  @IsNumber()
  promotion_price: number;
  @IsBoolean()
  featured: boolean;
  @IsBoolean()
  archived: boolean;
  @IsBoolean()
  active: boolean;
  created_at: Date;
  updated_at: Date;
}
