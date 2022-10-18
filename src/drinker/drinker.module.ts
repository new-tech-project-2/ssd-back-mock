import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { DrinkerSchema } from 'src/drinker/drinker.schema';
import { SocketModule } from 'src/socket/socket.module';
import { DrinkerController } from './drinker.controller';
import { DrinkerRepository } from './drinker.repository';
import { DrinkerService } from './drinker.service';
@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Drinker', schema: DrinkerSchema }]),
    SocketModule,
  ],
  controllers: [DrinkerController],
  providers: [DrinkerRepository, DrinkerService],
})
export class DrinkerModule {}
