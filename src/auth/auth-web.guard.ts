import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

/**
 * authToken을 해석해서 body에 dispenserToken을 실어줌
 */
@Injectable()
export class AuthWebGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const authToken = req.headers['authorization'];
    const dispenserToken = await this.authService.validateUser(authToken);
    req.body.dispenserToken = dispenserToken;
    return Boolean(dispenserToken);
  }
}
