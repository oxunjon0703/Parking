import { Test, TestingModule } from '@nestjs/testing';
import { LayerController } from './layer.controller';
import { LayerService } from './layer.service';

describe('LayerController', () => {
  let controller: LayerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LayerController],
      providers: [LayerService],
    }).compile();

    controller = module.get<LayerController>(LayerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
