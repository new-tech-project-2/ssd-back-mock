import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SocketService } from 'src/socket/socket.service';
import { verifyDispenserResultDto } from './dto/verify-dispenser.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private socketService: SocketService,
  ) {}

  verifyDispenser(dispenserToken: string): verifyDispenserResultDto {
    const result = this.socketService.verifyDispenser(dispenserToken);
    if (result === false) {
      return { success: false };
    }
    const authToken = this.jwtService.sign(
      { token: dispenserToken },
      {
        expiresIn: 60 * 30,
      },
    );

    return { authToken, success: true };
  }

  validateUser(authToken: string): boolean {
    const dispenserToken = this.jwtService.verify(authToken);
    const result = this.socketService.verifyDispenser(dispenserToken);
    if (result === false) {
      throw UnauthorizedException;
    }
    return result;
  }
}
