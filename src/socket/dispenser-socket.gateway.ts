import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'ws';

@WebSocketGateway({ path: '/socket/dispenser' })
export class DispenserSocketGateway
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
const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
