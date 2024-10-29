import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReturnOrderItemDTO } from './dtos/returnOrderItem.dto';
import { OrderItemService } from './order-item.service';
import { CreateOrderItemDto } from './dtos/createOrderItem';
import { OrderItemEntity } from './entities/order-item.entity';

@Controller('orderItem')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Post()
  async create(
    @Body() createdOrderItem: CreateOrderItemDto,
  ): Promise<OrderItemEntity> {
    return this.orderItemService.create(createdOrderItem);
  }

  @Get()
  async getAll(): Promise<ReturnOrderItemDTO[]> {
    return (await this.orderItemService.getAll()).map(
      (orderItemEntity) => new ReturnOrderItemDTO(orderItemEntity),
    );
  }

  @Get('/:id')
  async getById(@Param('id') id: string): Promise<ReturnOrderItemDTO> {
    return new ReturnOrderItemDTO(await this.orderItemService.getById(id));
  }
}
