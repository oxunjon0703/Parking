import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ParkService } from '../park/park.service';
import { Observable, lastValueFrom } from 'rxjs';
import { OwnerMustHaveParkIdException } from './exception/user.exception';
import { RolesGuard } from '../shared/role.guard';
import { RolesDecorator } from 'src/common/decorators/role.Decorator';
import { RoleEnum } from 'src/common/enums/enum';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';

@ApiTags('user.service')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly parkService: ParkService,
  ) {}

  @Post('client')
  async createClient(@Body() createUserDto: CreateUserDto) {
    if (createUserDto.parkId) {
      const responseData: Observable<any> = await this.parkService.findOne(
        createUserDto.parkId,
      );

      await lastValueFrom(responseData);
    }

    return await this.userService.createClent(createUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator(RoleEnum.Admin)
  @Post('owner')
  async createOwner(@Body() createUserDto: CreateUserDto) {
    if (!createUserDto.parkId) {
      throw new OwnerMustHaveParkIdException();
    }
    if (createUserDto.parkId) {
      const responseData: Observable<any> = await this.parkService.findOne(
        createUserDto.parkId,
      );

      await lastValueFrom(responseData);
    }

    return await this.userService.createOwner(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator(RoleEnum.Admin, RoleEnum.Owner)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    if (updateUserDto.parkId) {
      const responseData: Observable<any> = await this.parkService.findOne(
        updateUserDto.parkId,
      );

      await lastValueFrom(responseData);
    }

    return this.userService.update(id, updateUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator(RoleEnum.Admin)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
