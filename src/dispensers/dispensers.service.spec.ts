import { Test, TestingModule } from '@nestjs/testing';
import { DispensersService } from './dispensers.service';

describe('DispensersService', () => {
  let service: DispensersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DispensersService],
    }).compile();

    service = module.get<DispensersService>(DispensersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
