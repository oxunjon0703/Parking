import { Test, TestingModule } from '@nestjs/testing';
import { ShotController } from './shot.controller';
import { ShotService } from './shot.service';

describe('ShotController', () => {
  let controller: ShotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShotController],
      providers: [ShotService],
    }).compile();

    controller = module.get<ShotController>(ShotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
