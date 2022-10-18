import { Injectable } from '@nestjs/common';
import { SocketService } from 'src/socket/socket.service';
import { DrinkerRepository } from './drinker.repository';
import { DrinkerResultDto } from './dto/delete-drinker.dto';
import { DrinkerAuthDto, GetDrinkersResultDto } from './dto/drinker.dto';
import { UpdateDrinkerDto } from './dto/update-drinker.dto';

@Injectable()
export class DrinkerService {
  constructor(
    private readonly drinkerRepository: DrinkerRepository,
    private readonly socketService: SocketService,
  ) {}
  async getDrinkersByDispenserId(
    drinkersDto: DrinkerAuthDto,
  ): Promise<GetDrinkersResultDto> {
    const { dispenserToken } = drinkersDto;
    const drinkers = await this.drinkerRepository.getAll(dispenserToken);
    return { drinkers: drinkers };
  }
  async addDriknerTmp(drinkerId: string, dispenserToken: string) {
    await this.drinkerRepository.create({
      id: drinkerId,
      name: `${drinkerId}의 술잔`,
      detail: `${drinkerId}의 술잔입니다.`,

      dispenserToken: dispenserToken,
    });
  }

  async deleteDrinkerByDrinkerId(drinkerId: string): Promise<DrinkerResultDto> {
    const result = await this.drinkerRepository.delete(drinkerId);
    return { success: result };
  }

  async updateDrinkerByDrinkerId(
    drinkerId: string,
    updateDrinkerDto: UpdateDrinkerDto,
  ): Promise<DrinkerResultDto> {
    const result = await this.drinkerRepository.update(
      drinkerId,
      updateDrinkerDto,
    );
    return { success: result };
  }
}
