import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class AuthTokenStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(authToken: string): Promise<any> {
    const dispenserToken = await this.authService.validateUser(authToken);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
