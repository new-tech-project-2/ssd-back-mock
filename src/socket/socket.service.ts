import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { DispenserService } from 'src/dispenser/dispenser.service';
import { DrinkerService } from 'src/drinker/drinker.service';
import { DispenserSocketGateway } from './dispenser-socket.gateway';
import { UserSocketGateway } from './user-socket.gateway';

@Injectable()
export class SocketService {
  constructor(
    @Inject(forwardRef(() => DispenserSocketGateway))
    private dispenserSocketGateway: DispenserSocketGateway,
    @Inject(forwardRef(() => UserSocketGateway))
    private usersSocketGateway: UserSocketGateway,
    private authService: AuthService,
    private dispenserService: DispenserService,
    private drinkerService: DrinkerService,
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
    this.dispenserService.addDispenser(dispenserToken, socket.id);
    this.dispenserTokenToSocketIdMap.set(dispenserToken, socket.id);
  }

  clearDispenser(socket: Socket): void {
    this.usersSocketGateway.server.socketsLeave(socket.id);
    this.dispenserService.deleteDispenser(socket.id);
    this.dispenserTokenToSocketIdMap.delete(socket.id);
    socket.disconnect();
  }

  addUserSocket(socket: Socket, authToken: string): void {
    const dispenserToken = this.authService.getDispenserToken(authToken);
    if (dispenserToken == null) {
      socket.disconnect();
      return;
    }
    const socketId = this.dispenserTokenToSocketIdMap.get(dispenserToken);
    socket.join(socketId);
  }

  changeDrinkerEvent(dispenserToken: string): void {
    const socketId = this.dispenserTokenToSocketIdMap.get(dispenserToken);
    this.usersSocketGateway.server.to(socketId).emit('change');
  }

  startDispenserEvent(dispenserToken: string): void {
    const socketId = this.dispenserTokenToSocketIdMap.get(dispenserToken);
    this.drinkerService.resetAllDrikerTimestamp(dispenserToken);
    this.dispenserSocketGateway.server.to(socketId).emit('start');
    this.usersSocketGateway.server.to(socketId).emit('start');
  }

  stopDispenserEvent(dispenserToken: string): void {
    const socketId = this.dispenserTokenToSocketIdMap.get(dispenserToken);
    this.drinkerService.resetAllDrikerDrinks(dispenserToken);
    this.dispenserSocketGateway.server.to(socketId).emit('stop');
    this.usersSocketGateway.server.to(socketId).emit('stop');
  }
}
