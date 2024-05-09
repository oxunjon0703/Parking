import { ResData } from '../../../lib/resData';
import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

export interface IUserService {
  findAll(): Promise<ResData<Array<UserEntity>>>;
  findOneById(id: number): Promise<ResData<UserEntity | undefined>>;
  findOneByPhone(phone: string): Promise<ResData<UserEntity | undefined>>;
  create(dto: CreateUserDto): Promise<ResData<UserEntity>>;
  updated(dto: UpdateUserDto): Promise<ResData<UserEntity>>;
  delete(id: number): Promise<ResData<UserEntity | undefined>>;
}
