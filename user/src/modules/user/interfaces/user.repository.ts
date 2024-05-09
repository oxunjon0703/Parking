import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';

export interface IUserRepository {
  findAll(): Promise<Array<UserEntity>>;
  findOneById(id: number): Promise<UserEntity | undefined>;
  findOneByPhone(phone: string): Promise<UserEntity | undefined>;
  create(dto: UserEntity): Promise<UserEntity>;
  update(dto: UpdateUserDto): Promise<UserEntity>;
  delete(id: number): void;
}
