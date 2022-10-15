import { Controller, Delete, Get, Param } from '@nestjs/common';

import { DrinkerService } from './drinker.service';
import { DeleteDrinkResultDto } from './dto/delete-drink-dto';
import { GetDrinkersResultDto } from './dto/drinker.dto';

@Controller('drinker')
export class DrinkerController {
  constructor(private readonly drinkerService: DrinkerService) {}

  @Get()
  async getDrinkers(): Promise<GetDrinkersResultDto> {
    return await this.drinkerService.getDrinkersByDispenserId({
      dispenserId: 'aaa',
    });
  }
  /**
   * @param drinkerId 삭제할 술잔의 아이디
   * @returns 결과 {success: 성공 실패 여부}
   */
  @Delete(':drinkerId')
  async deleteDrinker(
    @Param('drinkerId') drinkerId: string
  ): Promise<DeleteDrinkResultDto> {
    return await this.drinkerService.deleteDrinkerByDrinkerId(drinkerId);
  }
}
