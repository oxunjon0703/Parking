import { Inject, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TRANSACTION_PACKAGE } from '../../common/consts/microservices';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class TransactionService {
  private transactionService: any;

  constructor(
    @Inject(TRANSACTION_PACKAGE) private TransactionClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.transactionService =
      this.TransactionClient.getService('TransactionService');
  }

  async create(createTransactionDto: CreateTransactionDto) {
    return await this.transactionService.Create(createTransactionDto);
  }

  async findAll() {
    return await this.transactionService.FindAll({});
  }

  async findOne(id: number) {
    return await this.transactionService.FindOne({ id });
  }

  async remove(id: number) {
    return await this.transactionService.Delete({ id });
  }
}
