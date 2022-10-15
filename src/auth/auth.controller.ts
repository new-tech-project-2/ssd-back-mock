import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import {
  verifyDispenserDto,
  verifyDispenserResultDto,
} from './dto/verify-dispenser.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  postAuth(@Body() dto: verifyDispenserDto): verifyDispenserResultDto {
    return this.authService.verifyDispenser(dto.dispenserToken);
  }
}
