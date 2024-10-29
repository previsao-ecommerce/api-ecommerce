import { Injectable, NotFoundException } from '@nestjs/common';

import { OrderEntity } from './entities/order.entity';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateOrderDTO } from './dtos/createOrder.dto';
import { UpdateOrderDTO } from './dtos/updateOrder.dto';
import { UserService } from 'src/user/user.service';
import { OrderItemService } from 'src/orderItem/order-item.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    private readonly userService: UserService,
    private readonly orderItemService: OrderItemService,
  ) {}

  async create(createOrderDTO: CreateOrderDTO): Promise<OrderEntity> {
    return this.orderRepository.save(createOrderDTO);
  }

  async getAll(): Promise<OrderEntity[]> {
    return this.orderRepository.find({
      relations: ['user'],
    });
  }

  async getById(id: string): Promise<OrderEntity> {
    const order = await this.orderRepository.findOne({
      where: { id },
    });

    if (!order) {
      throw new NotFoundException('Pedido não encontrado');
    }

    return order;
  }

  async getByUserId(userId: string): Promise<OrderEntity[]> {
    const user = await this.userService.getById(userId);

    const orders = this.orderRepository.find({
      where: { user_id: user?.id },
      relations: ['user'],
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (!orders) {
      throw new NotFoundException('Pedido não encontrado');
    }

    return orders;
  }

  async update(updateOrderDTO: UpdateOrderDTO): Promise<OrderEntity> {
    const order = await this.orderRepository.findOne({
      where: { id: updateOrderDTO.id },
    });

    if (!order) {
      throw new NotFoundException(
        `Pedido não encontrado com o id: ${updateOrderDTO.id}`,
      );
    }

    return this.orderRepository.save({
      ...order,
      ...updateOrderDTO,
    });
  }

  async delete(id: string): Promise<void> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['orderItems'],
    });

    if (!order) {
      throw new NotFoundException(`Pedido não encontrado com o id: ${id}`);
    }

    // Excluir cada order_item individualmente
    for (const orderItem of order.orderItems) {
      await this.orderItemService.delete(orderItem.id);
    }

    // Em seguida, excluir o pedido em si
    await this.orderRepository.delete(id);
  }
}
