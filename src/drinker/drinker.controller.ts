import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';

import { DrinkerService } from './drinker.service';
import { DrinkerResultDto } from './dto/delete-drinker.dto';
import { DrinkersDto, GetDrinkersResultDto } from './dto/drinker.dto';
import { UpdateDrinkerDto } from './dto/update-drinker.dto';

@Controller('drinker')
export class DrinkerController {
  constructor(private readonly drinkerService: DrinkerService) {}

  @Get()
  async getDrinkers(): Promise<GetDrinkersResultDto> {
    return await this.drinkerService.getDrinkersByDispenserId({
      dispenserToken: 'aaa',
    });
  }
  @Post(':drinkerId')
  async addDrinker(
    @Param('drinkerId') drinkerId: string,
    @Body() drinkersDto: DrinkersDto,
  ) {
    return await this.drinkerService.addDriknerTmp(
      drinkerId,
      drinkersDto.dispenserToken,
    );
  }
  /**
   * @param drinkerId 삭제할 술잔의 아이디
   * @returns 결과 {success: 성공 실패 여부}
   */
  @Delete(':drinkerId')
  async deleteDrinker(
    @Param('drinkerId') drinkerId: string,
  ): Promise<DrinkerResultDto> {
    return await this.drinkerService.deleteDrinkerByDrinkerId(drinkerId);
  }

  @Patch(':drinkerId')
  async updateDrinker(
    @Param('drinkerId') drinkerId: string,
    @Body() updateDrinkerDto: UpdateDrinkerDto,
  ): Promise<DrinkerResultDto> {
    return await this.drinkerService.updateDrinkerByDrinkerId(
      drinkerId,
      updateDrinkerDto,
    );
  }
}
