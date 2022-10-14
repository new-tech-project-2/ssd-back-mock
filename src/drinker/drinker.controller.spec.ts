import { Test, TestingModule } from '@nestjs/testing';
import { DrinkerController } from './drinker.controller';

describe('DrinkerController', () => {
  let controller: DrinkerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DrinkerController],
    }).compile();

    controller = module.get<DrinkerController>(DrinkerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
