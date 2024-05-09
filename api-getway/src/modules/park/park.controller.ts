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
import { ParkService } from './park.service';
import { CreateParkDto } from './dto/create-park.dto';
import { UpdateParkDto } from './dto/update-park.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { Observable, lastValueFrom } from 'rxjs';
import { UserNOtOwnerException } from './exception/park.exception';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { RolesGuard } from '../shared/role.guard';
import { RolesDecorator } from 'src/common/decorators/role.Decorator';
import { RoleEnum } from 'src/common/enums/enum';

@ApiTags('park.service')
@Controller('park')
export class ParkController {
  constructor(
    private readonly parkService: ParkService,
    private readonly userService: UserService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator(RoleEnum.Admin)
  @Post()
  async create(@Body() createParkDto: CreateParkDto) {
    if (createParkDto.owner) {
      const responseData: Observable<any> = await this.userService.findOne(
        createParkDto.owner,
      );

      const chekUser = await lastValueFrom(responseData);

      if (!(chekUser.data.role == 'owner')) {
        throw new UserNOtOwnerException();
      }
    }

    return this.parkService.create(createParkDto);
  }

  @Get()
  async findAll() {
    return await this.parkService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.parkService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator(RoleEnum.Admin, RoleEnum.Owner)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateParkDto: UpdateParkDto,
  ) {
    if (updateParkDto.owner) {
      const responseData: Observable<any> = await this.userService.findOne(
        updateParkDto.owner,
      );

      const chekUser = await lastValueFrom(responseData);

      if (!(chekUser.data.role == 'owner')) {
        throw new UserNOtOwnerException();
      }
    }
    return await this.parkService.update(id, updateParkDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator(RoleEnum.Admin)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.parkService.remove(id);
  }
}
