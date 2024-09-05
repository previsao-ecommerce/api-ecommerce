import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDTO } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressService } from 'src/address/address.service';
import { UpdateUserDto } from './dtos/updateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    private readonly addressService: AddressService,
  ) {}

  async create(createdUserDTO: CreateUserDTO): Promise<UserEntity> {
    const salt = 10;

    const passwordHashed = await hash(createdUserDTO.password, salt);

    const existCPF = await this.userRepository.findOne({
      where: {
        cpf_cnpj: createdUserDTO.cpf_cnpj,
      },
    });

    const existEmail = await this.userRepository.findOne({
      where: {
        email: createdUserDTO.email,
      },
    });
    const existAddress = await this.addressService.getById(
      createdUserDTO.address_id,
    );

    if (!existAddress) {
      throw new NotFoundException('Endereço não encontrado');
    }

    if (existCPF) {
      throw new ConflictException('CPF já cadastrado');
    }

    if (existEmail) {
      throw new ConflictException('Email já cadastrado');
    }

    const newUser = await this.userRepository.save({
      ...createdUserDTO,
      password: passwordHashed,
    });

    return newUser;
  }

  async getAll(): Promise<UserEntity[]> {
    return this.userRepository.find({
      relations: ['address'],
    });
  }

  async getById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  async getByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('E-mail não encontrado');
    }

    return user;
  }

  async update(updateUserDTO: UpdateUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id: updateUserDTO.id },
    });

    if (!user) {
      throw new NotFoundException(
        `Usuário não encontrado com o id: ${updateUserDTO.id}`,
      );
    }

    return this.userRepository.save({
      ...user,
      ...updateUserDTO,
    });
  }

  async delete(id: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Usuário não encontrado com o id: ${id}`);
    }

    await this.userRepository.remove(user);
  }
}
