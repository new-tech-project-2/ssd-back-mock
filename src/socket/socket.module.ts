import { Module } from '@nestjs/common';
import { DispenserSocketGateway } from './dispenser-socket.gateway';
import { SocketService } from './socket.service';
import { UserSocketGateway } from './user-socket.gateway';

@Module({
  imports: [],
  controllers: [],
  exports: [SocketService],
  providers: [SocketService, UserSocketGateway, DispenserSocketGateway],
})
export class SocketModule {}
