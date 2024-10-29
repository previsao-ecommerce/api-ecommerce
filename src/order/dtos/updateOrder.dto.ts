import { OrderStatus } from '../../utils/enums/order-status.enum';

export class UpdateOrderDTO {
  id: string;
  observation?: string;
  status: OrderStatus;
  total: number;
}
