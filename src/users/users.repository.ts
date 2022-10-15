import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from './users.schema';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(Users.name) private readonly userModel: Model<Users>
  ) {}
}
