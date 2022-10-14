import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'ws';

@WebSocketGateway({ path: '/socket' })
export class SocketGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;
  @SubscribeMessage('message')
  onEvent(client, data: any): string {
    console.log(client, data);
    return 'hello';
  }

  async handleConnection(client: WebSocket) {
    for (let i = 0; i < 3; i += 1) {
      await sleep(1000);
      client.send('asdasd');
    }
  }
}
const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
