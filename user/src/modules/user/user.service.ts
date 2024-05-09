import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserService } from './interfaces/user.service';
import { UserRepository } from './user.repository';
import { UserEntity } from './entities/user.entity';
import { ResData } from '../../lib/resData';
import { UserNotFoundRpcException } from './exception/user.exception';

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly repository: UserRepository) {}

  async findAll(): Promise<ResData<Array<UserEntity>>> {
    const users = await this.repository.findAll();

    return new ResData('get all users', 200, users);
  }

  async findOneById(id: number): Promise<ResData<UserEntity | undefined>> {
    const foundData = await this.repository.findOneById(id);

    if (!foundData) {
      throw new UserNotFoundRpcException();
    }

    return new ResData('success', 200, foundData);
  }

  async findOneByPhone(
    phone: string,
  ): Promise<ResData<UserEntity | undefined>> {
    const foundData = await this.repository.findOneByPhone(phone);

    const resData = new ResData('success', 200, foundData);

    if (!foundData) {
      resData.message = 'Not Found';
      resData.statusCode = 404;
    }

    return resData;
  }

  async create(dto: CreateUserDto): Promise<ResData<UserEntity>> {
    const newUser = new UserEntity();

    Object.assign(newUser, dto);

    const newUserEntity = await this.repository.create(newUser);

    return new ResData('success', 200, newUserEntity);
  }

  async updated(dto: UpdateUserDto): Promise<ResData<UserEntity>> {
    const { data: foundUser } = await this.findOneById(dto.id);

    if (!foundUser) {
      throw new UserNotFoundRpcException();
    }

    const updateProduct = await this.repository.update(dto);

    return new ResData('updated', 201, updateProduct);
  }

  async delete(id: number): Promise<ResData<UserEntity | undefined>> {
    const foundData = await this.repository.findOneById(id);

    if (!foundData) {
      throw new UserNotFoundRpcException();
    }

    await this.repository.delete(id);

    return new ResData('deleted', 200, foundData);
  }
}
