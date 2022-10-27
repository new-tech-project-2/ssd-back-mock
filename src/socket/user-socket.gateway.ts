import { forwardRef, Inject } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketService } from './socket.service';

@WebSocketGateway({ path: '/socket/user', cors: true })
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
    try {
      const authToken = client.handshake.query.authToken.toString();
      this.socketService.addUserSocket(client, authToken);
    } catch (e) {
      client.disconnect();
    }
  }
  handleDisconnect(client: Socket) {
    client.disconnect();
  }
}
