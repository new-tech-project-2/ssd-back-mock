import { Module } from '@nestjs/common';
import { DispenserSocketGateway } from './dispenser-socket.gateway';
import { UserSocketGateway } from './user-socket.gateway';

@Module({
  imports: [],
  controllers: [],
  providers: [UserSocketGateway, DispenserSocketGateway],
})
export class DrinkerModule {}
