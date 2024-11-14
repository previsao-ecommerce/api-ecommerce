import { Module, forwardRef } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from 'src/order/order.module';
import { OrderItemModule } from 'src/orderItem/order-item.module';
import { OrderEntity } from 'src/order/entities/order.entity';
import { OrderItemEntity } from 'src/orderItem/entities/order-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, OrderItemEntity]),
    forwardRef(() => OrderModule), // Importando o módulo de Order
    forwardRef(() => OrderItemModule), // Importando o módulo de OrderItem
  ],
  controllers: [WebhookController],
  providers: [WebhookService],
})
export class WebhookModule {}
