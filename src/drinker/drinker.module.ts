import { Module } from '@nestjs/common';
import { DrinkerController } from './drinker.controller';

@Module({
  controllers: [DrinkerController],
  providers: [],
})
export class DrinkerModule {}
