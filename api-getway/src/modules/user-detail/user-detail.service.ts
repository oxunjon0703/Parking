import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDetailDto } from './dto/create-user-detail.dto';
import { UpdateUserDetailDto } from './dto/update-user-detail.dto';
import { USER_PACKAGE } from '../../common/consts/microservices';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class UserDetailService {
  private userDetailService: any;

  constructor(@Inject(USER_PACKAGE) private UserDetailClient: ClientGrpc) {}

  onModuleInit() {
    this.userDetailService =
      this.UserDetailClient.getService('UserDetailService');
  }

  async create(createUserDetailDto: CreateUserDetailDto) {
    return await this.userDetailService.Create(createUserDetailDto);
  }

  async findAll() {
    return await this.userDetailService.FindAll({});
  }

  async findOne(id: number) {
    return await this.userDetailService.FindOne({ id });
  }

  async update(id: number, updateUserDetailDto: UpdateUserDetailDto) {
    const dto = { id: id, ...updateUserDetailDto };
    return await this.userDetailService.Update(dto);
  }

  async remove(id: number) {
    return await this.userDetailService.Delete({ id });
  }
}
