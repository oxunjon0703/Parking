import { Injectable } from '@nestjs/common';
import { UpdateUserDetailDto } from './dto/update-user-detail.dto';
import { IUserDetailRepository } from './interfaces/user-detail.repository';
import { UserDetailEntity } from './entities/user-detail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserDetailRepository implements IUserDetailRepository {
  constructor(
    @InjectRepository(UserDetailEntity)
    private repository: Repository<UserDetailEntity>,
  ) {}

  async findAll(): Promise<Array<UserDetailEntity>> {
    return await this.repository.find();
  }

  async findOneById(id: number): Promise<UserDetailEntity | undefined> {
    return await this.repository.findOneBy({ id });
  }

  async create(entity: UserDetailEntity): Promise<UserDetailEntity> {
    const newUserDetail = this.repository.create(entity);

    await this.repository.save(newUserDetail);

    return newUserDetail;
  }

  async update(dto: UpdateUserDetailDto): Promise<UserDetailEntity> {
    return await this.repository.save(dto);
  }

  async delete(id: number) {
    return await this.repository.delete(id);
  }
}
