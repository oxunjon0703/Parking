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
import { LayerService } from './layer.service';
import { CreateLayerDto } from './dto/create-layer.dto';
import { UpdateLayerDto } from './dto/update-layer.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ParkService } from '../park/park.service';
import { Observable, lastValueFrom } from 'rxjs';
import { LayerNameOrFloorException } from './exception/layer.exception';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { RolesGuard } from '../shared/role.guard';
import { RolesDecorator } from 'src/common/decorators/role.Decorator';
import { RoleEnum } from 'src/common/enums/enum';

@ApiTags('layer.service')
@Controller('layer')
export class LayerController {
  constructor(
    private readonly layerService: LayerService,
    private readonly parkService: ParkService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator(RoleEnum.Admin, RoleEnum.Owner)
  @Post()
  async create(@Body() createLayerDto: CreateLayerDto) {
    if (!(createLayerDto.name || createLayerDto.floor)) {
      throw new LayerNameOrFloorException();
    }

    const responseData: Observable<any> = await this.parkService.findOne(
      createLayerDto.parkId,
    );

    await lastValueFrom(responseData);

    return await this.layerService.create(createLayerDto);
  }

  @Get()
  async findAll() {
    return await this.layerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.layerService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator(RoleEnum.Admin, RoleEnum.Owner)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLayerDto: UpdateLayerDto,
  ) {
    if (!(updateLayerDto.name || updateLayerDto.floor)) {
      throw new LayerNameOrFloorException();
    }

    await this.layerService.findOne(id);

    const responseData: Observable<any> = await this.parkService.findOne(
      updateLayerDto.parkId,
    );

    await lastValueFrom(responseData);

    return await this.layerService.update(id, updateLayerDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator(RoleEnum.Admin, RoleEnum.Owner)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.layerService.remove(id);
  }
}
