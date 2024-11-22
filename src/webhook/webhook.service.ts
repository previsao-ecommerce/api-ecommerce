import { Injectable, Inject } from '@nestjs/common';
import Stripe from 'stripe';
import { OrderService } from '../order/order.service';
import { OrderItemService } from '../orderItem/order-item.service';
import { OrderStatus } from 'src/utils/enums/order-status.enum';

@Injectable()
export class WebhookService {
  private stripe: Stripe;

  constructor(
    private readonly orderService: OrderService,
    private readonly orderItemService: OrderItemService,
  ) {
    this.stripe = new Stripe(
      'sk_test_51QH88qGo50WW5CWAscTMtmZhzTYnZTUBOrPBHEWEcZBsLgu5TSpBENwHmuXdp9HmDnR5N6wacSWS4Wo6Mb4uZ6Ic00FOzIFrYJ',
    );
  }

  async handleEvent(payload: any, signature: string) {
    const event = this.stripe.webhooks.constructEvent(
      payload,
      signature,
      'whsec_YUO0PVmoHqjza55T69s3UhU6SjLfzXHv',
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      const userId = session.metadata.userId;
      const observation = session.metadata.observation;
      const total = session.amount_total / 100;

      // Cria o pedido
      const order = await this.orderService.create({
        user_id: userId,
        observation,
        status: OrderStatus.APPROVED,
        total,
        created_at: new Date(),
        updated_at: new Date(),
      });

      // Recupera os line items e cria os itens do pedido com o product_id do metadata
      const lineItems = await this.stripe.checkout.sessions.listLineItems(
        session.id,
      );

      const productIds = session.metadata.productIds.split(',');
      const categoryIds = session.metadata.categoryIds.split(',');
      const categoryNumbers = session.metadata.categoryNumbers.split(',');

      console.log('Items: ', lineItems.data);

      for (let index = 0; index < lineItems.data.length; index++) {
        const item = lineItems.data[index];

        await this.orderItemService.create({
          order_id: order.id,
          product_id: productIds[index],
          product_category_id: categoryIds[index],
          product_category_number: Number(categoryNumbers[index]),
          quantity: item.quantity,
          unit_price: item.price.unit_amount / 100,
          total: (item.price.unit_amount / 100) * item.quantity,
          created_at: new Date(),
          updated_at: new Date(),
        });
      }
    }
  }
}
