import { Injectable } from '@nestjs/common';
import { DrinkerRepository } from './drinker.repository';
import { DrinkerResultDto } from './dto/delete-drinker.dto';
import { GetDrinkersDto, GetDrinkersResultDto } from './dto/drinker.dto';
import { UpdateDrinkerDto } from './dto/update-drinker.dto';

@Injectable()
export class DrinkerService {
  constructor(private readonly drinkerRepository: DrinkerRepository) {}
  async getDrinkersByDispenserId(
    getDrinkersDto: GetDrinkersDto
  ): Promise<GetDrinkersResultDto> {
    const { dispenserId } = getDrinkersDto;
    const drinkers = await this.drinkerRepository.getAll(dispenserId);
    return { drinkers: drinkers };
  }

  async deleteDrinkerByDrinkerId(drinkerId: string): Promise<DrinkerResultDto> {
    const result = await this.drinkerRepository.delete(drinkerId);
    return { success: result };
  }

  async updateDrinkerByDrinkerId(
    drinkerId: string,
    updateDrinkerDto: UpdateDrinkerDto
  ): Promise<DrinkerResultDto> {
    const result = await this.drinkerRepository.update(
      drinkerId,
      updateDrinkerDto
    );
    return { success: result };
  }
}
