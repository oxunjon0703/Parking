import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Request } from 'express';
import { existsSync, mkdirSync } from 'fs';
import { FILE_PACKAGE } from 'src/common/consts/microservices';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { config } from 'src/common/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: FILE_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: 'file',
          protoPath: join(__dirname, '../../protos/file.proto'),
          url: config.filePort,
        },
      },
    ]),
    MulterModule.register({
      storage: diskStorage({
        destination: (
          req: Request,
          file: Express.Multer.File,
          cb: (err: Error | null, destination: string) => void,
        ) => {
          const uploadPath = 'uploads';

          if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath);
          }
          cb(null, uploadPath);
        },
        filename: (
          req: Request,
          file: Express.Multer.File,
          cb: (err: Error | null, filename: string) => void,
        ): void => {
          cb(
            null,
            `${file.mimetype.split('/')[0]}__${Date.now()}.${file.mimetype.split('/')[1]}`,
          );
        },
      }),
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
