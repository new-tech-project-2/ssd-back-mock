import { forwardRef, Inject } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { SocketAuthDto } from './dto/socket-auth.dto';
import { SocketService } from './socket.service';

@WebSocketGateway({ path: '/socket/user' })
export class UserSocketGateway {
  constructor(
    @Inject(forwardRef(() => SocketService))
    private socketService: SocketService
  ) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('auth')
  onEvent(client, data: SocketAuthDto): void {
    this.socketService.addUserSocket(client, data.dispenserToken);
  }
}
