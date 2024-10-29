import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OrderItemEntity } from './entities/order-item.entity';
import { CreateOrderItemDto } from './dtos/createOrderItem';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItemEntity)
    private readonly orderItemRepository: Repository<OrderItemEntity>,
  ) {}

  async create(
    createOrderItemDTO: CreateOrderItemDto,
  ): Promise<OrderItemEntity> {
    return this.orderItemRepository.save(createOrderItemDTO);
  }

  async getAll(): Promise<OrderItemEntity[]> {
    return this.orderItemRepository.find({
      relations: ['product', 'order'],
    });
  }

  async getById(id: string): Promise<OrderItemEntity> {
    const orderItem = await this.orderItemRepository.findOne({
      where: { id },
    });

    if (!orderItem) {
      throw new NotFoundException('Item do pedido não encontrado');
    }

    return orderItem;
  }

  async getByProductId(productId: string): Promise<OrderItemEntity[]> {
    return this.orderItemRepository.find({
      where: { product_id: productId },
      relations: ['product', 'order'],
    });
  }

  async delete(id: string): Promise<void> {
    await this.orderItemRepository.delete(id);
  }
}
