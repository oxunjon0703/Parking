import { Test, TestingModule } from '@nestjs/testing';
import { ShotService } from './shot.service';

describe('ShotService', () => {
  let service: ShotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShotService],
    }).compile();

    service = module.get<ShotService>(ShotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
