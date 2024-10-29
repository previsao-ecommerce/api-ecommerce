import { Module, forwardRef } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { AddressModule } from 'src/address/address.module';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { OrderItemModule } from 'src/orderItem/order-item.module';
import { OrderItemEntity } from 'src/orderItem/entities/order-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, UserEntity]),
    AddressModule,
    UserModule,
    OrderItemModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
