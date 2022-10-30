import { Injectable } from '@nestjs/common';
import { DrinkerRepository } from './drinker.repository';
import { DrinkerResultDto } from './dto/delete-drinker.dto';
import { DrinkerAuthDto, GetDrinkersResultDto } from './dto/drinker.dto';
import { UpdateDrinkerDto } from './dto/update-drinker.dto';

@Injectable()
export class DrinkerService {
  constructor(private readonly drinkerRepository: DrinkerRepository) {}
  async getDrinkersByDispenserId(
    drinkersDto: DrinkerAuthDto,
  ): Promise<GetDrinkersResultDto> {
    const { dispenserToken } = drinkersDto;
    const drinkers = await this.drinkerRepository.getAll(dispenserToken);
    return { drinkers: drinkers };
  }
  async addDrinkerTmp(drinkerId: string, dispenserToken: string) {
    await this.drinkerRepository.create({
      id: drinkerId,
      name: `${drinkerId}의 술잔`,
      detail: `${drinkerId}의 술잔입니다.`,

      dispenserToken: dispenserToken,
    });
  }

  async deleteDrinkerByDrinkerId(drinkerId: string): Promise<DrinkerResultDto> {
    const result = await this.drinkerRepository.deleteByDrinkerId(drinkerId);
    return { success: result };
  }
  async deleteAllDrinker(dispenserToken: string): Promise<DrinkerResultDto> {
    const result = await this.drinkerRepository.deleteByDispenserId(
      dispenserToken,
    );
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

  async updateDrinkDrinkerByDrinkerId(
    drinkerId: string,
  ): Promise<DrinkerResultDto> {
    const result = await this.drinkerRepository.updateDrink(drinkerId);
    return { success: result };
  }
  async resetAllDrikerDrinks(
    dispenserToken: string,
  ): Promise<DrinkerResultDto> {
    const result = await this.drinkerRepository.resetAllDrinkDrinks(
      dispenserToken,
    );
    return { success: result };
  }
  async resetAllDrikerTimestamp(
    dispenserToken: string,
  ): Promise<DrinkerResultDto> {
    const result = await this.drinkerRepository.resetAllDrinkTimestamps(
      dispenserToken,
    );
    return { success: result };
  }
  async drinkAllDriker(dispenserToken: string): Promise<DrinkerResultDto> {
    const result = await this.drinkerRepository.updateAllDrink(dispenserToken);
    return { success: result };
  }
}
