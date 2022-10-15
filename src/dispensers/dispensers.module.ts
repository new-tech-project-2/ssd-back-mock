import { Module } from '@nestjs/common';
import { DispensersService } from './dispensers.service';

@Module({
  exports: [DispensersService],
  providers: [DispensersService],
})
export class DispensersModule {}
