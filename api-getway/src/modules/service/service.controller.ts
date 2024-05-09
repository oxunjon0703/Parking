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
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ParkService } from '../park/park.service';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';
import { lastValueFrom } from 'rxjs';
import { TariffService } from '../tariff/tariff.service';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { RolesGuard } from '../shared/role.guard';
import { RolesDecorator } from 'src/common/decorators/role.Decorator';
import { RoleEnum } from 'src/common/enums/enum';

@ApiTags('service.service')
@Controller('service')
export class ServiceController {
  constructor(
    private readonly serviceService: ServiceService,
    private readonly parkService: ParkService,
    private readonly userService: UserService,
    private readonly tariffService: TariffService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() createServiceDto: CreateServiceDto) {
    const responseData: Observable<any> = await this.parkService.findOne(
      createServiceDto.parkId,
    );

    await lastValueFrom(responseData);

    const resData: Observable<any> = await this.userService.findOne(
      createServiceDto.userId,
    );

    await lastValueFrom(resData);

    if (createServiceDto.tariffId) {
      const resTariff: Observable<any> = await this.tariffService.findOne(
        createServiceDto.tariffId,
      );

      const Tariffprice = await lastValueFrom(resTariff);

      createServiceDto.price = Tariffprice.data.price;
    }

    return this.serviceService.create(createServiceDto);
  }

  @Get()
  async findAll() {
    return await this.serviceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.serviceService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    const Data: Observable<any> = await this.serviceService.findOne(id);

    await lastValueFrom(Data);

    const responseData: Observable<any> = await this.parkService.findOne(
      updateServiceDto.parkId,
    );

    await lastValueFrom(responseData);

    const resData: Observable<any> = await this.userService.findOne(
      updateServiceDto.userId,
    );

    await lastValueFrom(resData);

    if (updateServiceDto.tariffId) {
      const resTariff: Observable<any> = await this.tariffService.findOne(
        updateServiceDto.tariffId,
      );

      const Tariffprice = await lastValueFrom(resTariff);

      updateServiceDto.price = Tariffprice.data.price;
    }

    return await this.serviceService.update(id, updateServiceDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator(RoleEnum.Admin, RoleEnum.Owner)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.serviceService.remove(id);
  }
}
