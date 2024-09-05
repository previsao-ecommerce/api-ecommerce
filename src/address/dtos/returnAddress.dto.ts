import { AddressEntity } from '../entities/address.entity';

export class ReturnAddressDto {
  id: string;
  cep: string;
  street: string;
  number: number;
  district: string;
  city: string;
  state: string;
  complement?: string;
  created_at: Date;
  updated_at: Date;

  constructor(addressEntity: AddressEntity) {
    this.id = addressEntity.id;
    this.cep = addressEntity.cep;
    this.street = addressEntity.street;
    this.number = addressEntity.number;
    this.district = addressEntity.district;
    this.city = addressEntity.city;
    this.state = addressEntity.state;
    this.complement = addressEntity.complement;
    this.created_at = addressEntity.created_at;
    this.updated_at = addressEntity.updated_at;
  }
}
