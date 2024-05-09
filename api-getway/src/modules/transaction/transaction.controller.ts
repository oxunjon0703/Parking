import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ShotService } from '../shot/shot.service';
import { ServiceService } from '../service/service.service';
import { TransferNotMoneyException } from './exception/transaction.exception';
import { Observable, lastValueFrom } from 'rxjs';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { RolesGuard } from '../shared/role.guard';
import { RolesDecorator } from 'src/common/decorators/role.Decorator';
import { RoleEnum } from 'src/common/enums/enum';

@ApiTags('transaction.service')
@Controller('transaction')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly shotService: ShotService,
    private readonly serviceService: ServiceService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator(RoleEnum.Admin, RoleEnum.Owner)
  @Post()
  async create(@Body() dto: CreateTransactionDto) {
    if (dto.shotCreditId === dto.shotDebitId) {
      throw new TransferNotMoneyException();
    }

    const checkCredit: Observable<any> = await this.shotService.findOne(
      dto.shotCreditId,
    );
    await lastValueFrom(checkCredit);

    const checkDebit: Observable<any> = await this.shotService.findOne(
      dto.shotDebitId,
    );
    await lastValueFrom(checkDebit);

    const checkService: Observable<any> = await this.serviceService.findOne(
      dto.serviceId,
    );
    const data = await lastValueFrom(checkService);

    dto.amount = data.data.price;

    return await this.transactionService.create(dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator(RoleEnum.Admin, RoleEnum.Owner)
  @Get()
  async findAll() {
    return await this.transactionService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator(RoleEnum.Admin, RoleEnum.Owner)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.transactionService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator(RoleEnum.Admin)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.transactionService.remove(id);
  }
}
