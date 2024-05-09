import { createConnection, DataSource } from 'typeorm';
import { typeOrmConfig } from '../../common/config/typeorm.config';
import { ShotEntity } from 'src/modules/shot/entities/shot.entity';
import { TransactionEntity } from 'src/modules/transaction/entities/transaction.entity';

(async () => {
  const datasource: DataSource = await createConnection(typeOrmConfig);

  const queryRunner = datasource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    const shotRepository = queryRunner.manager.getRepository(ShotEntity);
    const transactionRepository =
      queryRunner.manager.getRepository(TransactionEntity);

    const shot = await shotRepository.find();
    await shotRepository.remove(shot);
    const transaction = await transactionRepository.find();
    await transactionRepository.remove(transaction);

    let shot1 = shotRepository.create({ userId: 1, amount: 200000 });
    shot1 = await shotRepository.save(shot1);
    let shot2 = shotRepository.create({ userId: 2, amount: 150000 });
    shot2 = await shotRepository.save(shot2);

    let transaction1 = transactionRepository.create({
      shotCreditId: shot1.id,
      shotDebitId: shot2.id,
      serviceId: 1,
      amount: 50000,
    });
    transaction1 = await transactionRepository.save(transaction1);

    await queryRunner.commitTransaction();
  } catch (err) {
    // since we have errors lets rollback the changes we made
    await queryRunner.rollbackTransaction();
  } finally {
    // you need to release a queryRunner which was manually instantiated
    await queryRunner.release();
  }
})();
