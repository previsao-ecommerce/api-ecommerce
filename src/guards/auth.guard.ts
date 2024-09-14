import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;

    if (!authorization) {
      return false;
    }

    const token = authorization.split(' ')[1];

    try {
      const data = await this.authService.checkToken(token);

      const user = await this.userService.getById(data.id);

      request.user = user;

      return true;
    } catch (e) {
      return false;
    }
  }
}
