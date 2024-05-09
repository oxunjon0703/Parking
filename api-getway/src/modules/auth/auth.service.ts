import { Inject, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/create-auth.dto';
import { ClientGrpc } from '@nestjs/microservices';
import { USER_PACKAGE } from 'src/common/consts/microservices';
import { Observable, lastValueFrom } from 'rxjs';
import { compar } from '../../lib/bcrypt';
import { LoginOrPasswordWrongException } from './dto/exception/auth.exception';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private userService: any;

  constructor(
    @Inject(USER_PACKAGE) private UserClient: ClientGrpc,
    private jwtService: JwtService,
  ) {}

  onModuleInit() {
    this.userService = this.UserClient.getService('UserService');
  }
  async create(loginAuthDto: LoginDto) {
    const phone = loginAuthDto.phone;
    const checkPhone: Observable<any> = await this.userService.FindOnePhone({
      phone,
    });

    const check = await lastValueFrom(checkPhone);

    if (check.statusCode === 404) {
      throw new LoginOrPasswordWrongException();
    }

    const checkPassword = await compar(
      loginAuthDto.password,
      check.data.password,
    );

    if (!checkPassword) {
      throw new LoginOrPasswordWrongException();
    }

    const token = await this.jwtService.signAsync({ id: check.data.id });

    const data = { user: check, token: token };

    return { message: 'success', statusCode: 200, data: data };
  }
}
