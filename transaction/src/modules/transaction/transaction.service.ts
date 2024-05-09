import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ResData } from '../../lib/resData';
import { TransactionEntity } from './entities/transaction.entity';
import { TransactionNotFoundRpcException } from './exception/transaction.exception';
import { TransactionRepository } from './transaction.repository';
import { ITransactionService } from './interfaces/transaction.service';

@Injectable()
export class TransactionService implements ITransactionService {
  constructor(private readonly repository: TransactionRepository) {}

  async findAll(): Promise<ResData<TransactionEntity[]>> {
    const Transactions = await this.repository.findAll();

    return new ResData('get all Transactions', 200, Transactions);
  }

  async findOneById(id: number): Promise<ResData<TransactionEntity>> {
    const foundData = await this.repository.findOneById(id);

    if (!foundData) {
      throw new TransactionNotFoundRpcException();
    }

    return new ResData('get by id Transaction', 200, foundData);
  }

  async create(dto: CreateTransactionDto): Promise<ResData<TransactionEntity>> {
    const newTransaction = new TransactionEntity();

    Object.assign(newTransaction, dto);

    const newTransactionEntity = await this.repository.insert(newTransaction);

    return new ResData('success', 200, newTransactionEntity);
  }

  async delete(id: number): Promise<ResData<TransactionEntity>> {
    const foundData = await this.repository.findOneById(id);

    if (!foundData) {
      throw new TransactionNotFoundRpcException();
    }

    await this.repository.delete(id);

    return new ResData('delete', 200, foundData);
  }
}
