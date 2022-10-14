import { Injectable } from '@nestjs/common';
import { PostAuthDto } from './auth.dto';

@Injectable()
export class AuthService {
  check(dto: PostAuthDto) {
    const { dispenserToken } = dto;
    if (dispenserToken.length > 3) {
      return { success: true };
    }
    return { success: false };
  }
}
