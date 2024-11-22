import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CheckoutService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(
      'sk_test_51QH88qGo50WW5CWAscTMtmZhzTYnZTUBOrPBHEWEcZBsLgu5TSpBENwHmuXdp9HmDnR5N6wacSWS4Wo6Mb4uZ6Ic00FOzIFrYJ',
    );
  }

  async createCheckoutSession(
    items: any[],
    userId: string,
    observation: string,
  ): Promise<{ url: string }> {
    // Mapeie os itens para o formato que o Stripe espera, incluindo `product_id` no `metadata`
    const lineItems = items.map((item) => ({
      price_data: {
        currency: 'brl',
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // em centavos
      },
      quantity: item.quantity,
    }));

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:3000/success', // URL para redirecionamento após sucesso
      cancel_url: 'http://localhost:3000/cancel', // URL para redirecionamento ao cancelar
      metadata: {
        userId,
        observation,
        productIds: items.map((item) => item.product_id).join(','),
        categoryIds: items.map((item) => item.product_category_id.id).join(','),
        categoryNumbers: items
          .map((item) => item.product_category_id.number)
          .join(','),
      },
    });

    return { url: session.url };
  }
}
