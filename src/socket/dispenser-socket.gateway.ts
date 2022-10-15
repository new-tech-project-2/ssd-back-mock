import {
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketAuthDto } from './dto/socket-auth.dto';
import { SocketService } from './socket.service';

@WebSocketGateway({ path: '/socket/dispenser' })
export class DispenserSocketGateway implements OnGatewayDisconnect {
  constructor(private socketService: SocketService) {}
  @WebSocketServer()
  server: Server;

  handleDisconnect(client: Socket) {
    this.socketService.clearDispenser(client);
  }

  @SubscribeMessage('auth')
  onEvent(client: Socket, data: SocketAuthDto): void {
    this.socketService.addDispenserSocket(client, data.dispenserToken);
  }
}
