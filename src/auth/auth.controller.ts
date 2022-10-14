import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { PostAuthDto, PostAuthResult } from './dto/post-auth.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  postAuth(@Body() dto: PostAuthDto): PostAuthResult {
    return this.authService.check(dto);
  }
}
