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
  /**
   * 유저가 접속시 디스펜서 토큰이 올바른지를 검증함
   * @param dispenserToken
   * @returns
   */
  verifyDispenser(dispenserToken: string): verifyDispenserResultDto {
    const result = this.socketService.verifyDispenser(dispenserToken);
    if (result === false) {
      return { success: false };
    }
    const authToken = this.jwtService.sign({ dispenserToken: dispenserToken });

    return { authToken, success: true };
  }

  validateUser(authToken: string): string {
    const dispenserToken = this.getDispenserToken(authToken);
    const result = this.socketService.verifyDispenser(dispenserToken);

    if (result === false) {
      throw UnauthorizedException;
    }
    return dispenserToken;
  }

  getDispenserToken(authToken: string): string {
    const dispenserToken = this.jwtService.verify(authToken);

    return dispenserToken.dispenserToken;
  }
}
