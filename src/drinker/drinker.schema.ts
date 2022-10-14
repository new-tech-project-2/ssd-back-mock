import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { DrinkerDto } from './drinker.dto';
@Schema()
export class Drinker extends Document {
  @Prop({ required: true, unique: true, _id: true })
  id: string;
  @Prop({ default: 0 })
  totalCapacity: number;
  @Prop({ default: 0 })
  currentDrinks: number;
  @Prop({ default: '이름..' })
  name: string;
  @Prop({ default: '설명을 넣어주세요' })
  detail: string;
  @Prop({ default: Date.now() })
  lastDrinkTimestamp: number;

  @Prop({ required: true, type: Types.ObjectId, ref: 'id' })
  dispenserId: string;

  readonly protectedData: DrinkerDto;
}

export const DrinkerSchema = SchemaFactory.createForClass(Drinker);

DrinkerSchema.virtual('protectedData').get(function (this: Drinker) {
  console.log(this);
  return new DrinkerDto(this);
});
