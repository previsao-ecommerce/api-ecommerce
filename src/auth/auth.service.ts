import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserEntity } from 'src/user/entities/user.entity';
import { LoginDTO } from './dtos/login.dto';
import { UserService } from 'src/user/user.service';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ReturnLoginDTO } from './dtos/returnLogin.dto';
import { ReturnUserDto } from 'src/user/dtos/returnUser.dto';
import { LoginPayloadDTO } from './dtos/loginPayload.dto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDTO): Promise<ReturnLoginDTO> {
    const user: UserEntity | undefined = await this.userService
      .getByEmail(loginDto.email)
      .catch(() => undefined);

    const isMatch = await compare(loginDto.password, user?.password || '');

    if (!user || !isMatch) {
      throw new NotFoundException('E-mail ou senha inválidos');
    }

    return {
      accessToken: this.jwtService.sign({ ...new LoginPayloadDTO(user) }),
      user: new ReturnUserDto(user),
    };
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    const user = await this.userService.getByEmail(email);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (user) {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        secure: false,
        port: 587,
        auth: {
          user: 'catalogoplace@gmail.com',
          pass: 'ngwy ifii nhwj mfwn',
        },
      });

      const mailOptions = {
        from: 'catalogoplace@gmail.com',
        to: email,
        subject: 'Redefinição de senha',
        text: ` Você solicitou a redefinição de senha.
        Clique no link abaixo para redefinir sua senha:
        https://catalogoplaceadmin.vercel.app/password_reset/${user.id}
        Se você não solicitou a redefinição de senha, ignore este email.
        `,
      };

      // Enviar o e-mail
      await transporter.sendMail(mailOptions);
    }

    return { message: 'E-mail enviado com sucesso' };
  }

  async resetPassword(
    userId: string,
    password: string,
  ): Promise<{ message: string }> {
    const user = await this.userService.getById(userId);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const hashedPassword = await hash(password, 10);
    user.password = hashedPassword;

    await this.userService.update(user);
    return { message: 'Senha alterada com sucesso' };
  }
}
