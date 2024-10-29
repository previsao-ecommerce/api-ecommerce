import { Module } from '@nestjs/common';
import { OrderItemController } from './order-item.controller';
import { OrderItemService } from './order-item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemEntity } from './entities/order-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItemEntity])],
  controllers: [OrderItemController],
  providers: [OrderItemService],
  exports: [OrderItemService],
})
export class OrderItemModule {}
