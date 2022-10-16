import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { DispenserSocketGateway } from './dispenser-socket.gateway';
import { UserSocketGateway } from './user-socket.gateway';

@Injectable()
export class SocketService {
  constructor(
    @Inject(forwardRef(() => DispenserSocketGateway))
    private dispenserSocketGateway: DispenserSocketGateway,
    @Inject(forwardRef(() => UserSocketGateway))
    private usersSocketGateway: UserSocketGateway,
  ) {}
  private dispenserTokenToSocketIdMap: Map<string, string> = new Map<
    string,
    string
  >([['abcd', 'abcd']]);

  verifyDispenser(dispenserToken: string): boolean {
    const socketId = this.dispenserTokenToSocketIdMap.get(dispenserToken);

    if (socketId === undefined) {
      return false;
    }
    return true;
  }

  addDispenserSocket(socket: Socket, dispenserToken: string): void {
    socket.join(dispenserToken);
    this.dispenserTokenToSocketIdMap.set(dispenserToken, socket.id);
  }

  clearDispenser(socket: Socket): void {
    this.usersSocketGateway.server.socketsLeave(socket.id);
    this.dispenserTokenToSocketIdMap.delete(socket.id);
    socket.disconnect();
  }

  addUserSocket(socket: Socket, dispenserToken: string): void {
    const socketId = this.dispenserTokenToSocketIdMap.get(dispenserToken);
    socket.join(socketId);
  }

  addDrinkerEvent(dispenserToken: string): void {
    this.usersSocketGateway.server.to(dispenserToken).emit('add');
  }

  startDispenserEvent(dispenserToken: string): void {
    const socketId = this.dispenserTokenToSocketIdMap.get(dispenserToken);
    this.dispenserSocketGateway.server.to(socketId).emit('start');
    this.usersSocketGateway.server.to(socketId).emit('start');
  }

  stopDispenserEvent(dispenserToken: string): void {
    const socketId = this.dispenserTokenToSocketIdMap.get(dispenserToken);
    this.dispenserSocketGateway.server.to(socketId).emit('stop');
    this.usersSocketGateway.server.to(socketId).emit('stop');
  }
}
