import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { IUserRepository } from './interfaces/user.repository';
import { UpdateUserDto } from './dto/update-user.dto';

export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity) private repository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<Array<UserEntity>> {
    return await this.repository.find();
  }

  async findOneById(id: number): Promise<UserEntity | undefined> {
    return await this.repository.findOneBy({ id });
  }

  async findOneByPhone(phone: string): Promise<UserEntity | undefined> {
    return await this.repository.findOneBy({ phone });
  }

  async create(entity: UserEntity): Promise<UserEntity> {
    const newUser = this.repository.create(entity);

    await this.repository.save(newUser);

    return newUser;
  }

  async update(dto: UpdateUserDto): Promise<UserEntity> {
    return await this.repository.save(dto);
  }

  async delete(id: number) {
    return await this.repository.delete(id);
  }
}
