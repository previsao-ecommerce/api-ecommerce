import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { AddressEntity } from './entities/address.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
  ) {}

  async create(createAddressDto: CreateAddressDto): Promise<AddressEntity> {
    return this.addressRepository.save(createAddressDto);
  }

  async getAll(): Promise<AddressEntity[]> {
    return this.addressRepository.find();
  }

  async getById(id: string): Promise<AddressEntity> {
    const address = await this.addressRepository.findOne({
      where: { id },
    });

    if (!address) {
      throw new NotFoundException('Endereço não encontrado');
    }

    return address;
  }
}
