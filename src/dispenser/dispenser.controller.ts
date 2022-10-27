import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { AuthWebGuard } from 'src/auth/auth-web.guard';
import { DispenserService } from './dispenser.service';
import { DispenserAuthDto } from './dto/dispenser.dto';

@Controller('dispenser')
export class DispenserController {
  constructor(private readonly dispenserService: DispenserService) {}

  @UseGuards(AuthWebGuard)
  @Get()
  async getDispenserStatus(@Body() dto: DispenserAuthDto): Promise<boolean> {
    return await this.dispenserService.getDispenserStatusByDispenserToken(
      dto.dispenserToken,
    );
  }
  @UseGuards(AuthWebGuard)
  @Post()
  async startDispenserDrink(@Body() dto: DispenserAuthDto): Promise<boolean> {
    return await this.dispenserService.startDispenserStatus(dto.dispenserToken);
  }
  @UseGuards(AuthWebGuard)
  @Delete()
  async stopDispenserDrink(@Body() dto: DispenserAuthDto): Promise<boolean> {
    return await this.dispenserService.stopDispenserStatus(dto.dispenserToken);
  }
}
