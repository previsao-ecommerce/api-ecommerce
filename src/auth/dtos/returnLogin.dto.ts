import { ReturnUserDto } from 'src/user/dtos/returnUser.dto';

export interface ReturnLoginDTO {
  user: ReturnUserDto;
  accessToken: string;
}
