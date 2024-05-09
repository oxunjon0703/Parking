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
import { TariffService } from './tariff.service';
import { CreateTariffDto } from './dto/create-tariff.dto';
import { UpdateTariffDto } from './dto/update-tariff.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ParkService } from '../park/park.service';
import { Observable, lastValueFrom } from 'rxjs';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { RolesGuard } from '../shared/role.guard';
import { RolesDecorator } from 'src/common/decorators/role.Decorator';
import { RoleEnum } from 'src/common/enums/enum';

@ApiTags('tariff.service')
@Controller('tariff')
export class TariffController {
  constructor(
    private readonly tariffService: TariffService,
    private readonly parkService: ParkService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator(RoleEnum.Admin, RoleEnum.Owner)
  @Post()
  async create(@Body() createTariffDto: CreateTariffDto) {
    const responseData: Observable<any> = await this.parkService.findOne(
      createTariffDto.parkId,
    );

    await lastValueFrom(responseData);

    return this.tariffService.create(createTariffDto);
  }

  @Get()
  async findAll() {
    return await this.tariffService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.tariffService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator(RoleEnum.Admin, RoleEnum.Owner)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTariffDto: UpdateTariffDto,
  ) {
    const responseData: Observable<any> = await this.parkService.findOne(
      updateTariffDto.parkId,
    );

    await lastValueFrom(responseData);

    return this.tariffService.update(id, updateTariffDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator(RoleEnum.Admin, RoleEnum.Owner)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tariffService.remove(id);
  }
}
