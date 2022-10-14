import { Controller, Get } from '@nestjs/common';

import { GetDrinkersResultDto } from './drinker.dto';
import { DrinkerService } from './drinker.service';

@Controller('drinker')
export class DrinkerController {
  constructor(private readonly drinkerService: DrinkerService) {}
  @Get()
  async getDrinkers(): Promise<GetDrinkersResultDto> {
    return await this.drinkerService.getDrinkersByDispenserId({
      dispenserId: 'aaa',
    });
  }
}
