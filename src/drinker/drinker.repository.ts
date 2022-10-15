import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Drinker } from 'src/drinker/drinker.schema';
import { CreateDrinkerDto, DrinkerDto } from './dto/drinker.dto';
import { UpdateDrinkerDto } from './dto/update-drinker.dto';

@Injectable()
export class DrinkerRepository {
  constructor(
    @InjectModel(Drinker.name) private readonly drinkerModel: Model<Drinker>
  ) {}

  async create(createDrinkerDto: CreateDrinkerDto): Promise<Drinker> {
    return await this.drinkerModel.create(createDrinkerDto);
  }
  async getAll(dispenserId: string): Promise<Array<DrinkerDto>> {
    return (await this.drinkerModel.find({ dispenserId: dispenserId })).map(
      (drinker) => drinker.protectedData
    );
  }

  async delete(drinkerId: string): Promise<boolean> {
    const result = await this.drinkerModel.deleteOne({ id: drinkerId });
    return result.deletedCount === 1;
  }
  async update(
    drinkerId: string,
    updateDrinkerDto: UpdateDrinkerDto
  ): Promise<boolean> {
    await this.drinkerModel.findOneAndUpdate({
      id: drinkerId,
      updateDrinkerDto,
    });
    return true;
  }
}
