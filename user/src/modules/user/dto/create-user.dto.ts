import { RoleEnum } from '../../../common/types/enums';

export class CreateUserDto {
  phone: string;
  password: string;
  role: RoleEnum;
  parkId: number;
}
