import { Test, TestingModule } from '@nestjs/testing';
import { UserTariffController } from './user-tariff.controller';
import { UserTariffService } from './user-tariff.service';

describe('UserTariffController', () => {
  let controller: UserTariffController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserTariffController],
      providers: [UserTariffService],
    }).compile();

    controller = module.get<UserTariffController>(UserTariffController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
