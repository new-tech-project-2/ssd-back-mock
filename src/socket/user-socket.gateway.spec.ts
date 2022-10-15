import { Test, TestingModule } from '@nestjs/testing';
import { UserSocketGateway } from './user-socket.gateway';

describe('UserSocketGateway', () => {
  let gateway: UserSocketGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserSocketGateway],
    }).compile();

    gateway = module.get<UserSocketGateway>(UserSocketGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
