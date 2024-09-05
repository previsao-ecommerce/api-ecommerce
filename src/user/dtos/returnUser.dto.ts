import { UserEntity } from '../entities/user.entity';
import { ReturnAddressDto } from '../../address/dtos/returnAddress.dto';
import { UserType } from 'src/utils/enums/user-type.enum';

export class ReturnUserDto {
  id: string;
  name: string;
  cpf_cnpj: string;
  email: string;
  password: string;
  address_id: string;
  phone: string;
  image_url?: string;
  user_type: UserType;
  address?: ReturnAddressDto;
  created_at: Date;
  updated_at: Date;

  constructor(userEntity: UserEntity) {
    this.id = userEntity.id;
    this.name = userEntity.name;
    this.cpf_cnpj = userEntity.cpf_cnpj;
    this.email = userEntity.email;
    this.password = userEntity.password;
    this.address_id = userEntity.address_id;
    this.phone = userEntity.phone;
    this.image_url = userEntity.image_url;
    this.user_type = userEntity.user_type;
    this.created_at = userEntity.created_at;
    this.updated_at = userEntity.updated_at;

    this.address = userEntity.address
      ? new ReturnAddressDto(userEntity.address)
      : undefined;
  }
}
