import { ResData } from '../../../lib/resData';
import { UserDetailEntity } from '../entities/user-detail.entity';
import { CreateUserDetailDto } from '../dto/create-user-detail.dto';
import { UpdateUserDetailDto } from '../dto/update-user-detail.dto';

export interface IUserDetailService {
  findAll(): Promise<ResData<Array<UserDetailEntity>>>;
  findOneById(id: number): Promise<ResData<UserDetailEntity | undefined>>;
  create(dto: CreateUserDetailDto): Promise<ResData<UserDetailEntity>>;
  updated(dto: UpdateUserDetailDto): Promise<ResData<UserDetailEntity>>;
  delete(id: number): Promise<ResData<UserDetailEntity | undefined>>;
}
