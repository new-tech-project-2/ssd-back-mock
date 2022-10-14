import { Controller, Get } from '@nestjs/common';

@Controller('drinker')
export class DrinkerController {
  @Get()
  getDrinker(): string {
    return { drinkers: [] };
  }
}
