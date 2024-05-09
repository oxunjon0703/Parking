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
import { ShotService } from './shot.service';
import { CreateShotDto } from './dto/create-shot.dto';
import { UpdateShotDto } from './dto/update-shot.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { RolesGuard } from '../shared/role.guard';
import { RolesDecorator } from 'src/common/decorators/role.Decorator';
import { RoleEnum } from 'src/common/enums/enum';
// import { UserService } from '../user/user.service';
// import { Observable, lastValueFrom } from 'rxjs';

@ApiTags('shot.service')
@Controller('shot')
export class ShotController {
  constructor(private readonly shotService: ShotService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() createShotDto: CreateShotDto) {
    // const responseData: Observable<any> = await this.userService.findOne(
    //   createShotDto.userId,
    // );

    // await lastValueFrom(responseData);

    return this.shotService.create(createShotDto);
  }

  @Get()
  findAll() {
    return this.shotService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.shotService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateShotDto: UpdateShotDto,
  ) {
    // const responseData: Observable<any> = await this.userService.findOne(
    //   updateShotDto.userId,
    // );

    // await lastValueFrom(responseData);

    return this.shotService.update(id, updateShotDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator(RoleEnum.Admin)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.shotService.remove(id);
  }
}
