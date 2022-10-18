import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common';
import { AuthWebGuard } from '../auth/auth-web.guard';

import { DrinkerService } from './drinker.service';
import { DrinkerResultDto } from './dto/delete-drinker.dto';
import { DrinkerAuthDto, GetDrinkersResultDto } from './dto/drinker.dto';
import { UpdateDrinkerDto } from './dto/update-drinker.dto';

@Controller('drinker')
export class DrinkerController {
  constructor(private readonly drinkerService: DrinkerService) {}

  @UseGuards(AuthWebGuard)
  @Get()
  async getDrinkers(
    @Body() dto: DrinkerAuthDto,
  ): Promise<GetDrinkersResultDto> {
    return await this.drinkerService.getDrinkersByDispenserId({
      dispenserToken: dto.dispenserToken,
    });
  }
  @Post(':drinkerId')
  async addDrinker(
    @Param('drinkerId') drinkerId: string,
    @Body() drinkersDto: DrinkerAuthDto,
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
  @UseGuards(AuthWebGuard)
  @Delete(':drinkerId')
  async deleteDrinker(
    @Param('drinkerId') drinkerId: string,
  ): Promise<DrinkerResultDto> {
    return await this.drinkerService.deleteDrinkerByDrinkerId(drinkerId);
  }
  @UseGuards(AuthWebGuard)
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
