import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateOrderDTO } from './dtos/createOrder.dto';
import { OrderService } from './order.service';
import { OrderEntity } from './entities/order.entity';
import { ReturnOrderDTO } from './dtos/returnOrder.dto';
import { UpdateOrderDTO } from './dtos/updateOrder.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() createdOrder: CreateOrderDTO): Promise<OrderEntity> {
    return this.orderService.create(createdOrder);
  }

  @Get()
  async getAll(): Promise<ReturnOrderDTO[]> {
    return (await this.orderService.getAll()).map(
      (orderEntity) => new ReturnOrderDTO(orderEntity),
    );
  }
  @Get('/dashboard')
  async getDashboard(): Promise<any> {
    return this.orderService.getDashboard();
  }

  @Get('/:id')
  async getById(@Param('id') id: string): Promise<ReturnOrderDTO> {
    return new ReturnOrderDTO(await this.orderService.getById(id));
  }

  @Get('/user/:userId')
  async getByUserId(
    @Param('userId') userId: string,
  ): Promise<ReturnOrderDTO[]> {
    return (await this.orderService.getByUserId(userId)).map(
      (orderEntity) => new ReturnOrderDTO(orderEntity),
    );
  }

  @Put()
  async update(
    @Body() updateOrderDto: UpdateOrderDTO,
  ): Promise<ReturnOrderDTO> {
    return new ReturnOrderDTO(await this.orderService.update(updateOrderDto));
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.orderService.delete(id);
  }
}
