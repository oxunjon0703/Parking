export class ResData<T> {
  message: string;
  statusCode: number;
  data?: T | null;
  error?: Error | null;

  constructor(
    message: string,
    statusCode: number,
    data?: T | null,
    error?: Error | null,
  ) {
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
    this.error = error;
  }
}
