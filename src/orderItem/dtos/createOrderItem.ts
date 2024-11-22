import { IsNumber, IsString } from 'class-validator';

export class CreateOrderItemDto {
  @IsString()
  order_id: string;
  @IsString()
  product_id: string;
  @IsString()
  product_category_id: string;
  @IsNumber()
  product_category_number: number;
  @IsNumber()
  quantity: number;
  @IsNumber()
  unit_price: number;
  @IsNumber()
  total: number;
  created_at: Date;
  updated_at: Date;
}
