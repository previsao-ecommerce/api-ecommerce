import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { AddressEntity } from './entities/address.entity';
import { ReturnAddressDto } from './dtos/returnAddress.dto';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  async create(
    @Body() createdAddress: CreateAddressDto,
  ): Promise<AddressEntity> {
    return this.addressService.create(createdAddress);
  }

  @Get()
  async getAll(): Promise<ReturnAddressDto[]> {
    return (await this.addressService.getAll()).map(
      (addressEntity) => new ReturnAddressDto(addressEntity),
    );
  }

  @Get('/:id')
  async getById(@Param('id') id: string): Promise<ReturnAddressDto> {
    return new ReturnAddressDto(await this.addressService.getById(id));
  }
}
