import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersRepository } from './users.repository';
import { UsersSchema } from './users.schema';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  imports: [
    MongooseModule.forFeature([{ name: 'Users', schema: UsersSchema }]),
  ],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
