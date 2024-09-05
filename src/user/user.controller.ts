import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDTO } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { ReturnUserDto } from './dtos/returnUser.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { UpdateUserDto } from './dtos/updateUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() createdUser: CreateUserDTO): Promise<UserEntity> {
    return this.userService.create(createdUser);
  }

  @Get()
  async getAll(): Promise<ReturnUserDto[]> {
    return (await this.userService.getAll()).map(
      (userEntity) => new ReturnUserDto(userEntity),
    );
  }

  @Get('/:id')
  async getById(@Param('id') id: string): Promise<ReturnUserDto> {
    return new ReturnUserDto(await this.userService.getById(id));
  }

  @Put()
  async update(@Body() updateUserDto: UpdateUserDto): Promise<ReturnUserDto> {
    return new ReturnUserDto(await this.userService.update(updateUserDto));
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.userService.delete(id);
  }
}
