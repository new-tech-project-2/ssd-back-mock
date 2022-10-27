import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import {
  verifyDispenserDto,
  verifyDispenserResultDto
} from './dto/verify-dispenser.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async postAuth(
    @Body() dto: verifyDispenserDto,
  ): Promise<verifyDispenserResultDto> {
    return await this.authService.verifyDispenser(dto.dispenserToken);
  }
}
