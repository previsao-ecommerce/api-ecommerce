import { OrderEntity } from '../entities/order.entity';
import { OrderStatus } from 'src/utils/enums/order-status.enum';
import { ReturnUserDto } from 'src/user/dtos/returnUser.dto';

export class ReturnOrderDTO {
  id: string;
  user_id: string;
  observation?: string;
  status: OrderStatus;
  total: number;
  created_at: Date;
  updated_at: Date;
  user?: ReturnUserDto;

  constructor(orderEntity: OrderEntity) {
    this.id = orderEntity.id;
    this.observation = orderEntity.observation;
    this.status = orderEntity.status;
    this.total = orderEntity.total;

    this.created_at = orderEntity.created_at;
    this.updated_at = orderEntity.updated_at;

    this.user = orderEntity.user
      ? new ReturnUserDto(orderEntity.user)
      : undefined;
  }
}
