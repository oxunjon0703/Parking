import { Test, TestingModule } from '@nestjs/testing';
import { LayerService } from './layer.service';

describe('LayerService', () => {
  let service: LayerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LayerService],
    }).compile();

    service = module.get<LayerService>(LayerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
