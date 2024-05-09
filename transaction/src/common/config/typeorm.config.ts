// import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { IConfig } from './interfaces/config.interface';
dotenv.config();

export const config: IConfig = {
  transactionPort: process.env.TRANSACTION_PORT,
  dbUrl: process.env.DB_URL,
};

export const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  url: config.dbUrl,
  entities: [__dirname + '/../../**/*.entity.{js,ts}'],
  migrations: [__dirname + '/../../database/migration/*{.ts,.js}'],
  synchronize: false,
};

const dataSourse = new DataSource(typeOrmConfig);

export default dataSourse;
