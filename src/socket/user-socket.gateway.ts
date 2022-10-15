import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { sleep } from 'src/common/utils/sleep';
import { Server } from 'ws';

@WebSocketGateway({ path: '/socket/user' })
export class UserSocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  async handleConnection(client: WebSocket) {
    for (let i = 0; i < 3; i += 1) {
      await sleep(1000);
      client.send('asdasd');
    }
  }
  handleDisconnect(client: WebSocket) {
    throw new Error('Method not implemented.');
  }

  @SubscribeMessage('message')
  onEvent(client, data: any): string {
    console.log(client, data);
    return 'hello';
  }
}
