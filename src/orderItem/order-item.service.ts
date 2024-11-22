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

  async getByUserId(userId: string): Promise<OrderItemEntity[]> {
    return this.orderItemRepository
      .createQueryBuilder('order_item')
      .innerJoin('order_item.order', 'order') // Faz o join com a tabela order
      .where('order.user_id = :userId', { userId }) // Filtra pelo userId
      .select([
        'order_item.id',
        'order_item.quantity',
        'order_item.unit_price',
        'order_item.total',
        'order_item.product_category_id',
        'order_item.product_category_number',
      ]) // Opcional: escolha os campos que deseja selecionar
      .getMany(); // Recupera os dados
  }

  async delete(id: string): Promise<void> {
    await this.orderItemRepository.delete(id);
  }
}

// https://cce9-2804-1e68-800c-e08b-3461-c0b7-1966-4474.ngrok-free.app/
