import { Test, TestingModule } from '@nestjs/testing';
import { DispenserSocketGateway } from './dispenser-socket.gateway';

describe('DispenserSocketGateway', () => {
  let gateway: DispenserSocketGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DispenserSocketGateway],
    }).compile();

    gateway = module.get<DispenserSocketGateway>(DispenserSocketGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
