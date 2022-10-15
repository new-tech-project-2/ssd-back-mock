import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DispensersService } from 'src/dispensers/dispensers.service';
import { UsersService } from 'src/users/users.service';
import { verifyDispenserResultDto } from './dto/verify-dispenser.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private dispenserService: DispensersService
  ) {}

  verifyDispenser(dispenserToken: string): verifyDispenserResultDto {
    const result = this.dispenserService.verify(dispenserToken);
    const authToken = this.jwtService.sign(dispenserToken);
    if (result === false) {
      throw UnauthorizedException;
    }
    return { authToken };
  }

  validateUser(authToken: string): boolean {
    const dispenserToken = this.jwtService.verify(authToken);
    const result = this.dispenserService.verify(dispenserToken);
    if (result === false) {
      throw UnauthorizedException;
    }
    return result;
  }
}
