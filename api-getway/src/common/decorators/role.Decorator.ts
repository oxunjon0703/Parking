import { SetMetadata } from '@nestjs/common';
import { RoleEnum } from '../enums/enum';
import { ROLES_KEY } from '../consts/microservices';

export const RolesDecorator = (...roles: RoleEnum[]) =>
  SetMetadata(ROLES_KEY, roles);
