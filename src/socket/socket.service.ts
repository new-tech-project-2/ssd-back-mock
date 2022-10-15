import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { DispenserSocketGateway } from './dispenser-socket.gateway';
import { UserSocketGateway } from './user-socket.gateway';

@Injectable()
export class SocketService {
  constructor(
    private dispenserSocketGateway: DispenserSocketGateway,
    private usersSocketGateway: UserSocketGateway
  ) {}
  private dispenserSocketIdMap: Map<string, string> = new Map<string, string>([
    ['abcd', 'abcd'],
  ]);

  addDispenserSocket(socket: Socket, dispenserToken: string): void {
    // this.dispenserSocketMap.set(dispenserToken, {
    //   isStart: false,
    //   webSocket: socket,
    // });
    // this.userSocketMap.set(dispenserToken, new Map<string, Socket>());
    // this.socketToDispenserTokenMap.set(socket.get, dispenserToken);
    socket.join(dispenserToken);
    this.dispenserSocketIdMap.set(socket.id, dispenserToken);
  }

  clearDispenser(socket: Socket): void {
    const dispenserToken = this.dispenserSocketIdMap.get(socket.id);
    this.usersSocketGateway.server.socketsLeave(dispenserToken);
    this.dispenserSocketIdMap.delete(socket.id);
    socket.disconnect();
  }

  addUserSocket(socket: Socket, dispenserToken: string): void {
    socket.join(dispenserToken);
  }

  addDrinkerEvent(dispenserToken: string): void {
    this.usersSocketGateway.server.to(dispenserToken).emit('add');
  }

  startDispenserEvent(dispenserToken: string): void {
    this.dispenserSocketGateway.server.to(dispenserToken).emit('start');
    this.usersSocketGateway.server.to(dispenserToken).emit('start');
  }

  stopDispenserEvent(dispenserToken: string): void {
    this.dispenserSocketGateway.server.to(dispenserToken).emit('stop');
    this.usersSocketGateway.server.to(dispenserToken).emit('stop');
  }
}
