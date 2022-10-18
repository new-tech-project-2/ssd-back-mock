import { forwardRef, Inject } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketService } from './socket.service';

@WebSocketGateway({ path: '/socket/user' })
export class UserSocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    @Inject(forwardRef(() => SocketService))
    private socketService: SocketService,
  ) {}
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    client.handshake.headers.authorization;
  }
  handleDisconnect(client: Socket) {
    client.disconnect();
  }
}
