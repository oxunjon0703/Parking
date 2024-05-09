import { Request } from 'express';
// import { RoleEnum } from '../enums/enum';

export type ID = number;

export interface IRequest extends Request {
  user: ICurrentUser;
}

interface ICurrentUser {
  id: number;
  // phone: string;
  // password: string;
  // parkId: number;
  // role: RoleEnum;
  // createdAt: string;
  // lastEditedAt: string;
}
