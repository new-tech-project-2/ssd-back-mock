import { Injectable } from '@nestjs/common';
import { GetDrinkersDto, GetDrinkersResultDto } from './drinker.dto';
import { DrinkerRepository } from './drinker.repository';

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
}
