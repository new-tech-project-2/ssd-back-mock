import { forwardRef, Inject } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketService } from './socket.service';

@WebSocketGateway({ path: '/socket/dispenser', cors: true })
export class DispenserSocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    @Inject(forwardRef(() => SocketService))
    private socketService: SocketService,
  ) {}
  handleConnection(client: Socket) {
    try {
      const dispenserToken = client.handshake.query.dispenserToken.toString();
      this.socketService.addDispenserSocket(client, dispenserToken);
    } catch (e) {
      client.disconnect();
    }
  }
  @WebSocketServer()
  server: Server;

  handleDisconnect(client: Socket) {
    this.socketService.clearDispenser(client);
  }
}
