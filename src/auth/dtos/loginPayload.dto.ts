import { UserEntity } from 'src/user/entities/user.entity';
import { UserType } from 'src/utils/enums/user-type.enum';

export class LoginPayloadDTO {
  id: string;
  userType: UserType;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.userType = user.user_type;
  }
}
