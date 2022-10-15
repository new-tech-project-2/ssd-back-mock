import { Injectable } from '@nestjs/common';
import { DrinkerRepository } from './drinker.repository';
import { DeleteDrinkResultDto } from './dto/delete-drink-dto';
import { GetDrinkersDto, GetDrinkersResultDto } from './dto/drinker.dto';

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

  async deleteDrinkerByDrinkerId(
    drinkerId: string
  ): Promise<DeleteDrinkResultDto> {
    const result = await this.drinkerRepository.delete(drinkerId);
    return { success: result };
  }
}
