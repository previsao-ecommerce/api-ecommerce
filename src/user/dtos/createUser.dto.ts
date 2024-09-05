import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { UserType } from 'src/utils/enums/user-type.enum';

export class CreateUserDTO {
  @IsString()
  name: string;
  @IsString()
  cpf_cnpj: string;
  @IsString()
  email: string;
  @IsString()
  password: string;
  @IsUUID()
  address_id: string;
  @IsString()
  phone: string;
  @IsOptional()
  @IsString()
  image_url?: string;
  @IsEnum(UserType)
  user_type: UserType;
  created_at: Date;
  updated_at: Date;
}
