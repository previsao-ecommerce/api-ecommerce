import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { OrderStatus } from 'src/utils/enums/order-status.enum';

export class CreateOrderDTO {
  @IsString()
  user_id: string;
  @IsOptional()
  observation: string;
  @IsEnum(OrderStatus)
  status: OrderStatus;
  @IsNumber()
  total: number;
  created_at: Date;
  updated_at: Date;
}
