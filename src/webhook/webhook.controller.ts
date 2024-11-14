import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { WebhookService } from './webhook.service';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly stripeWebhookService: WebhookService) {}

  @Post('stripe')
  async handleStripeWebhook(@Req() req: Request, @Res() res: Response) {
    const signature: any = req.headers['stripe-signature'];
    const payload = req.body;

    try {
      await this.stripeWebhookService.handleEvent(payload, signature);
      res.sendStatus(200); // Retorna OK se o processamento foi bem-sucedido
    } catch (error) {
      console.error(error);
      res.status(400).send(`Webhook Error: ${error.message}`);
    }
  }
}
