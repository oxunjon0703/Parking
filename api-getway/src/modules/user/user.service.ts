import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { USER_PACKAGE } from '../../common/consts/microservices';
import { ClientGrpc } from '@nestjs/microservices';
import { hashed } from '../../lib/bcrypt';
import { Cache } from 'cache-manager';
import { ResData } from '../../lib/resData';
import { Observable, lastValueFrom } from 'rxjs';
import { UserAlreadyExistsException } from './exception/user.exception';
import { RoleEnum } from 'src/common/enums/enum';

@Injectable()
export class UserService {
  private userService: any;

  constructor(
    @Inject(USER_PACKAGE) private UserClient: ClientGrpc,
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
  ) {}

  onModuleInit() {
    this.userService = this.UserClient.getService('UserService');
  }

  async createClent(createUserDto: CreateUserDto) {
    const phone: string = createUserDto.phone;

    const checkPhone: Observable<any> = await this.userService.FindOnePhone({
      phone,
    });

    const check = await lastValueFrom(checkPhone);

    if (check.data) {
      throw new UserAlreadyExistsException();
    }
    createUserDto.role = RoleEnum.Client;
    createUserDto.password = await hashed(createUserDto.password);

    const newData: Observable<any> =
      await this.userService.Create(createUserDto);

    const newUser = await lastValueFrom(newData);

    await this.cacheManager.del('users');

    return new ResData('create', 201, newUser);
  }

  async createOwner(createUserDto: CreateUserDto) {
    const phone: string = createUserDto.phone;

    const checkPhone: Observable<any> = await this.userService.FindOnePhone({
      phone,
    });

    const check = await lastValueFrom(checkPhone);

    if (check.data) {
      throw new UserAlreadyExistsException();
    }
    createUserDto.role = RoleEnum.Owner;
    createUserDto.password = await hashed(createUserDto.password);

    const newData: Observable<any> =
      await this.userService.Create(createUserDto);

    const newUser = await lastValueFrom(newData);

    await this.cacheManager.del('users');

    return new ResData('create', 201, newUser);
  }

  async findAll() {
    const allUsers = await this.cacheManager.get('users');

    if (allUsers) {
      return new ResData('get all users redis', 200, allUsers);
    }

    const users: Observable<any> = await this.userService.findAll({});

    const data = await lastValueFrom(users);

    await this.cacheManager.set('users', data, 0);

    return new ResData('get all users', 200, data);
  }

  findOne(id: number) {
    return this.userService.findOne({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const phone: string = updateUserDto.phone;

    const checkPhone: Observable<any> = await this.userService.FindOnePhone({
      phone,
    });

    const check = await lastValueFrom(checkPhone);

    if (check.data) {
      throw new UserAlreadyExistsException();
    }

    updateUserDto.password = await hashed(updateUserDto.password);

    const dto = { id: id, ...updateUserDto };

    const newData: Observable<any> = await this.userService.Update(dto);

    const updateUser = await lastValueFrom(newData);

    await this.cacheManager.del('users');

    return new ResData('update', 201, updateUser);
  }

  async remove(id: number) {
    const data = await this.userService.Delete({ id });

    await this.cacheManager.del('users');

    return data;
  }
}
