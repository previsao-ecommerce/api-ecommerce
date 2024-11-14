import { Body, Controller, Post } from '@nestjs/common';
import { CheckoutService } from './checkout.service';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post('/session')
  async createCheckoutSession(
    @Body('items') items: any[],
    @Body('userId') userId: string, // Recebe userId do body
    @Body('observation') observation: string, // Recebe observation do body
  ): Promise<{ url: string }> {
    return this.checkoutService.createCheckoutSession(
      items,
      userId,
      observation,
    );
  }
}
