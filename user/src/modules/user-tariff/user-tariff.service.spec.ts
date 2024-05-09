import { Test, TestingModule } from '@nestjs/testing';
import { UserTariffService } from './user-tariff.service';

describe('UserTariffService', () => {
  let service: UserTariffService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserTariffService],
    }).compile();

    service = module.get<UserTariffService>(UserTariffService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
