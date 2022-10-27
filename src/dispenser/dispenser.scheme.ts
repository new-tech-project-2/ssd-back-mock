import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Dispenser extends Document {
  @Prop({ required: true, unique: true, _id: true })
  dispenserToken: string;
  @Prop({ required: true, unique: true })
  socketId: string;
  @Prop({ default: false })
  started: boolean;
  @Prop({ default: Date.now() })
  startTimestamp: number;
}

export const DispenserSchema = SchemaFactory.createForClass(Dispenser);
