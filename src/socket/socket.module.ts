import { Module } from '@nestjs/common';
import { DispenserSocketGateway } from './dispenser-socket.gateway';
import { SocketService } from './socket.service';
import { UserSocketGateway } from './user-socket.gateway';

@Module({
  imports: [],
  controllers: [],
  providers: [UserSocketGateway, DispenserSocketGateway, SocketService],
})
export class SocketModule {}
