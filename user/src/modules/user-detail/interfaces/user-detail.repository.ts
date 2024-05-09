import { UpdateUserDetailDto } from '../dto/update-user-detail.dto';
import { UserDetailEntity } from '../entities/user-detail.entity';

export interface IUserDetailRepository {
  findAll(): Promise<Array<UserDetailEntity>>;
  findOneById(id: number): Promise<UserDetailEntity | undefined>;
  create(dto: UserDetailEntity): Promise<UserDetailEntity>;
  update(dto: UpdateUserDetailDto): Promise<UserDetailEntity>;
  delete(id: number): void;
}
