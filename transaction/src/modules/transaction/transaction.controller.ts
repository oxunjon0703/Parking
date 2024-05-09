import { Controller } from '@nestjs/common';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller()
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @GrpcMethod('TransactionService', 'Create')
  create(@Payload() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.create(createTransactionDto);
  }

  @GrpcMethod('TransactionService', 'FindAll')
  findAll() {
    return this.transactionService.findAll();
  }

  @GrpcMethod('TransactionService', 'FindOne')
  findOne(data: { id: number }) {
    return this.transactionService.findOneById(data.id);
  }

  @GrpcMethod('TransactionService', 'Delete')
  remove(data: { id: number }) {
    return this.transactionService.delete(data.id);
  }
}
