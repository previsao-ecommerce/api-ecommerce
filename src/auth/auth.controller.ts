import {
  Body,
  Controller,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginDTO } from './dtos/login.dto';
import { AuthService } from './auth.service';
import { ReturnLoginDTO } from './dtos/returnLogin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(ValidationPipe)
  @Post('login')
  async login(@Body() loginDTO: LoginDTO): Promise<ReturnLoginDTO> {
    return this.authService.login(loginDTO);
  }

  @Post('password/forgot')
  async forgotPassword(
    @Body('email') email: string,
  ): Promise<{ message: string }> {
    return this.authService.forgotPassword(email);
  }

  @Post('password/reset/:userId')
  async resetPassword(
    @Body('password') newPassword: string,
    @Param('userId') userId: string,
  ): Promise<{ message: string }> {
    return this.authService.resetPassword(userId, newPassword);
  }
}
