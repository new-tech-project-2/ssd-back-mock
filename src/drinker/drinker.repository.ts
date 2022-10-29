import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Drinker } from 'src/drinker/drinker.schema';
import { CreateDrinkerDto, DrinkerDto } from './dto/drinker.dto';
import { UpdateDrinkerDto } from './dto/update-drinker.dto';

@Injectable()
export class DrinkerRepository {
  constructor(
    @InjectModel(Drinker.name) private readonly drinkerModel: Model<Drinker>,
  ) {}

  async create(createDrinkerDto: CreateDrinkerDto): Promise<Drinker> {
    return await this.drinkerModel.create(createDrinkerDto);
  }
  async getAll(dispenserToken: string): Promise<Array<DrinkerDto>> {
    return (
      await this.drinkerModel.find({ dispenserToken: dispenserToken })
    ).map((drinker) => drinker.protectedData);
  }

  async deleteByDrinkerId(drinkerId: string): Promise<boolean> {
    const result = await this.drinkerModel.deleteOne({ id: drinkerId });
    return result.deletedCount === 1;
  }
  async deleteByDispenserId(dispenserToken: string): Promise<boolean> {
    const result = await this.drinkerModel.deleteMany({
      dispenserToken: dispenserToken,
    });
    return result.deletedCount > 1;
  }
  async update(
    drinkerId: string,
    updateDrinkerDto: UpdateDrinkerDto,
  ): Promise<boolean> {
    await this.drinkerModel.findOneAndUpdate(
      {
        id: drinkerId,
      },
      {
        $set: {
          ...updateDrinkerDto,
        },
      },
    );
    return true;
  }

  async updateDrink(drinkerId: string): Promise<boolean> {
    await this.drinkerModel.findOneAndUpdate(
      {
        id: drinkerId,
      },
      {
        $inc: { currentDrinks: 1 },
      },
    );
    return true;
  }

  async updateAllDrink(dispenserToken: string): Promise<boolean> {
    await this.drinkerModel.updateMany(
      {
        dispenserToken: dispenserToken,
      },
      {
        $inc: { currentDrinks: 1 },
      },
    );
    return true;
  }
}
