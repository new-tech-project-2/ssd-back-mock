import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

/**
 * authToken을 해석해서 body에 dispenserToken을 실어줌
 */
@Injectable()
export class AuthWebGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    const authToken = req.headers['authorization'];
    const dispenserToken = this.authService.validateUser(authToken);
    req.body.dispenserToken = dispenserToken;
    return Boolean(dispenserToken);
  }
}
