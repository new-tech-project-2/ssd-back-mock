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
import { SocketService } from 'src/socket/socket.service';
import { AuthWebGuard } from '../auth/auth-web.guard';

import { DrinkerService } from './drinker.service';
import { DrinkerResultDto } from './dto/delete-drinker.dto';
import { DrinkerAuthDto, GetDrinkersResultDto } from './dto/drinker.dto';
import { UpdateDrinkerDto } from './dto/update-drinker.dto';

@Controller('drinker')
export class DrinkerController {
  constructor(
    private readonly drinkerService: DrinkerService,
    private readonly socketService: SocketService,
  ) {}

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
    this.socketService.changeDrinkerEvent(drinkersDto.dispenserToken);
    return await this.drinkerService.addDrinkerTmp(
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
    @Body() drinkersDto: DrinkerAuthDto,
  ): Promise<DrinkerResultDto> {
    this.socketService.changeDrinkerEvent(drinkersDto.dispenserToken);
    return await this.drinkerService.deleteDrinkerByDrinkerId(drinkerId);
  }
  @UseGuards(AuthWebGuard)
  @Delete()
  async deleteAllDrinker(
    @Param('drinkerId') drinkerId: string,
    @Body() drinkersDto: DrinkerAuthDto,
  ): Promise<DrinkerResultDto> {
    this.socketService.changeDrinkerEvent(drinkersDto.dispenserToken);
    return await this.drinkerService.deleteAllDrinker(
      drinkersDto.dispenserToken,
    );
  }
  @UseGuards(AuthWebGuard)
  @Patch(':drinkerId')
  async updateDrinker(
    @Param('drinkerId') drinkerId: string,
    @Body() updateDrinkerDto: UpdateDrinkerDto,
  ): Promise<DrinkerResultDto> {
    this.socketService.changeDrinkerEvent(updateDrinkerDto.dispenserToken);
    return await this.drinkerService.updateDrinkerByDrinkerId(
      drinkerId,
      updateDrinkerDto,
    );
  }

  @Patch(':drinkerId/drink')
  async drinkDrinker(
    @Param('drinkerId') drinkerId: string,
    @Body() drinkersDto: DrinkerAuthDto,
  ): Promise<DrinkerResultDto> {
    this.socketService.changeDrinkerEvent(drinkersDto.dispenserToken);
    return await this.drinkerService.updateDrinkDrinkerByDrinkerId(drinkerId);
  }

  @Patch('/drink')
  async drinkAllDrinker(
    @Body() drinkersDto: DrinkerAuthDto,
  ): Promise<DrinkerResultDto> {
    this.socketService.changeDrinkerEvent(drinkersDto.dispenserToken);
    return await this.drinkerService.drinkAllDriker(drinkersDto.dispenserToken);
  }
}
