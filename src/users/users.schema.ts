import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Users extends Document {
  @Prop({ required: true, unique: true, _id: true, auto: true })
  id: number;
}
export const UsersSchema = SchemaFactory.createForClass(Users);
