import { IsNumber, IsString } from 'class-validator';

export class CreateOrderItemDto {
  @IsString()
  order_id: string;
  @IsString()
  product_id: string;
  @IsNumber()
  quantity: number;
  @IsNumber()
  unit_price: number;
  @IsNumber()
  total: number;
  created_at: Date;
  updated_at: Date;
}
