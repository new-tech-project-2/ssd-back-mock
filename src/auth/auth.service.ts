import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DispenserService } from 'src/dispenser/dispenser.service';
import { verifyDispenserResultDto } from './dto/verify-dispenser.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private dispenserService: DispenserService,
  ) {}
  /**
   * 유저가 접속시 디스펜서 토큰이 올바른지를 검증함
   * @param dispenserToken
   * @returns
   */
  async verifyDispenser(
    dispenserToken: string,
  ): Promise<verifyDispenserResultDto> {
    const result = await this.dispenserService.isValidDispenserToken(
      dispenserToken,
    );
    if (result === false) {
      return { success: false };
    }
    const authToken = this.jwtService.sign({ dispenserToken: dispenserToken });

    return { authToken, success: true };
  }

  async validateUser(authToken: string): Promise<string> {
    const dispenserToken = this.getDispenserToken(authToken);
    const result = await this.dispenserService.isValidDispenserToken(
      dispenserToken,
    );

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
