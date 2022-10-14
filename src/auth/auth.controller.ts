import { Body, Controller, Post } from '@nestjs/common';
import { PostAuthDto, PostAuthResult } from './auth.dto';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  constructor(private readonly initService: AuthService) {}

  @Post()
  postAuth(@Body() dto: PostAuthDto): PostAuthResult {
    return this.initService.check(dto);
  }
}
