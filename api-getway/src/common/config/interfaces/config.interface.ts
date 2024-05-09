export interface IConfig {
  serverPort: number;
  filePort: string;
  parkPort: string;
  transactionPort: string;
  userPort: string;
  jwtSecretKey: string;
  jwtExpiredIn: string;
  redisHost: string;
  redisPort: number;
}
