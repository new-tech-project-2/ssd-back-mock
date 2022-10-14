import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DrinkerSchema } from 'src/drinker/drinker.schema';
import { DrinkerController } from './drinker.controller';
import { DrinkerRepository } from './drinker.repository';
import { DrinkerService } from './drinker.service';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Drinker', schema: DrinkerSchema }]),
  ],
  controllers: [DrinkerController],
  providers: [DrinkerRepository, DrinkerService],
})
export class DrinkerModule {}
