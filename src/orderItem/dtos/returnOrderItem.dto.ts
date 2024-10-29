import { ReturnUserDto } from 'src/user/dtos/returnUser.dto';
import { OrderItemEntity } from '../entities/order-item.entity';
import { ReturnCategoryDto } from 'src/category/dtos/returnCategory.dto';
import { ReturnOrderDTO } from 'src/order/dtos/returnOrder.dto';
import { ReturnProductDto } from 'src/product/dtos/returnProduct.dto';

export class ReturnOrderItemDTO {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  total: number;
  created_at: Date;
  updated_at: Date;

  order?: ReturnOrderDTO;
  product?: ReturnProductDto;

  constructor(orderItemEntity: OrderItemEntity) {
    this.id = orderItemEntity.id;
    this.order_id = orderItemEntity.order_id;
    this.product_id = orderItemEntity.product_id;
    this.quantity = orderItemEntity.quantity;
    this.unit_price = orderItemEntity.unit_price;
    this.total = orderItemEntity.total;
    this.created_at = orderItemEntity.created_at;
    this.updated_at = orderItemEntity.updated_at;

    this.order = orderItemEntity.order
      ? new ReturnOrderDTO(orderItemEntity.order)
      : undefined;

    this.product = orderItemEntity.product
      ? new ReturnProductDto(orderItemEntity.product)
      : undefined;
  }
}
