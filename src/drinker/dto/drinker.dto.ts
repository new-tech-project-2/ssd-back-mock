import { Drinker } from '../drinker.schema';

export class DrinkerDto {
  constructor(obj: Drinker) {
    this.id = obj.id;
    this.totalCapacity = obj.totalCapacity;
    this.currentDrinks = obj.currentDrinks;
    this.name = obj.name;
    this.detail = obj.detail;
    this.lastDrinkTimestamp = obj.lastDrinkTimestamp;
  }
  id: string;
  totalCapacity: number;
  currentDrinks: number;
  name: string;
  detail: string;
  lastDrinkTimestamp: number;
}

export class DrinkersDto {
  dispenserToken: string;
}

export class GetDrinkersResultDto {
  drinkers: Array<DrinkerDto>;
}

export class CreateDrinkerDto {
  id: string;
  totalCapacity?: number;
  currentDrinks?: number;
  name: string;
  detail: string;
  lastDrinkTimestamp?: number;
  dispenserToken: string;
}
