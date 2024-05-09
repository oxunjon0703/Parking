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
import { UserTariffService } from './user-tariff.service';
import { CreateUserTariffDto } from './dto/create-user-tariff.dto';
import { UpdateUserTariffDto } from './dto/update-user-tariff.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { TariffService } from '../tariff/tariff.service';
import { Observable, lastValueFrom } from 'rxjs';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { RolesGuard } from '../shared/role.guard';

@ApiTags('user-tariff.service')
@Controller('user-tariff')
export class UserTariffController {
  constructor(
    private readonly userTariffService: UserTariffService,
    private readonly userService: UserService,
    private readonly tariffService: TariffService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() createUserTariffDto: CreateUserTariffDto) {
    const responseData: Observable<any> = await this.userService.findOne(
      createUserTariffDto.userId,
    );

    await lastValueFrom(responseData);

    const resTariff: Observable<any> = await this.tariffService.findOne(
      createUserTariffDto.tariffId,
    );

    await lastValueFrom(resTariff);

    return this.userTariffService.create(createUserTariffDto);
  }

  @Get()
  async findAll() {
    return await this.userTariffService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.userTariffService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserTariffDto: UpdateUserTariffDto,
  ) {
    const checkTariff = await this.userTariffService.findOne(id);

    await lastValueFrom(checkTariff);

    const responseData: Observable<any> = await this.userService.findOne(
      updateUserTariffDto.userId,
    );

    await lastValueFrom(responseData);

    const resTariff: Observable<any> = await this.tariffService.findOne(
      updateUserTariffDto.tariffId,
    );

    await lastValueFrom(resTariff);
    return this.userTariffService.update(id, updateUserTariffDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userTariffService.remove(id);
  }
}
