import { Socket } from 'socket.io';
export class DispenserSocketWithStatusDO {
  webSocket?: Socket;
  isStart: boolean;
}
