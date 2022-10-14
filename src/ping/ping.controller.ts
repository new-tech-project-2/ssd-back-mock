import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('ping')
export class PingController {
  constructor(private readonly configService: ConfigService) {}
  @Get()
  getPing(): string {
    return 'pong';
  }
  @Get('/db')
  getDB(): string {
    return this.configService.get('DATABASE_HOST');
  }
}
