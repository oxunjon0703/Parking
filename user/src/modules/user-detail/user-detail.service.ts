import { Injectable } from '@nestjs/common';
import { CreateUserDetailDto } from './dto/create-user-detail.dto';
import { UpdateUserDetailDto } from './dto/update-user-detail.dto';
import { UserDetailRepository } from './user-detail.repository';
import { ResData } from '../../lib/resData';
import { UserDetailNotFoundRpcException } from './exception/user-detail.exception';
import { UserDetailEntity } from './entities/user-detail.entity';
import { IUserDetailService } from './interfaces/user-detail.service';

@Injectable()
export class UserDetailService implements IUserDetailService {
  constructor(private readonly repository: UserDetailRepository) {}

  async findAll(): Promise<ResData<Array<UserDetailEntity>>> {
    const usersDetail = await this.repository.findAll();

    return new ResData('get all users detail', 200, usersDetail);
  }

  async findOneById(
    id: number,
  ): Promise<ResData<UserDetailEntity | undefined>> {
    const foundData = await this.repository.findOneById(id);

    if (!foundData) {
      throw new UserDetailNotFoundRpcException();
    }

    return new ResData('get by id user detail', 200, foundData);
  }

  async create(dto: CreateUserDetailDto): Promise<ResData<UserDetailEntity>> {
    const newUserDetail = new UserDetailEntity();

    Object.assign(newUserDetail, dto);

    const newUserDetailEntity = await this.repository.create(newUserDetail);

    return new ResData('success', 200, newUserDetailEntity);
  }

  async updated(dto: UpdateUserDetailDto): Promise<ResData<UserDetailEntity>> {
    const { data: foundUserDetail } = await this.findOneById(dto.id);

    if (!foundUserDetail) {
      throw new UserDetailNotFoundRpcException();
    }

    const updateProduct = await this.repository.update(dto);

    return new ResData('updated', 201, updateProduct);
  }

  async delete(id: number): Promise<ResData<UserDetailEntity | undefined>> {
    const foundData = await this.repository.findOneById(id);

    if (!foundData) {
      throw new UserDetailNotFoundRpcException();
    }

    await this.repository.delete(id);

    return new ResData('deleted', 200, foundData);
  }
}
