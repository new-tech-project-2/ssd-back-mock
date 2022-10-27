import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { SocketModule } from 'src/socket/socket.module';
import { DispenserController } from './dispenser.controller';
import { DispenserRepository } from './dispenser.repository';
import { DispenserSchema } from './dispenser.scheme';
import { DispenserService } from './dispenser.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([{ name: 'Dispenser', schema: DispenserSchema }]),
    SocketModule,
  ],
  providers: [DispenserService, DispenserRepository],
  controllers: [DispenserController],
  exports: [DispenserService],
})
export class DispenserModule {}
