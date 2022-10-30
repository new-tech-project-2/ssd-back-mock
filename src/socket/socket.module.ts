import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { DispenserModule } from 'src/dispenser/dispenser.module';
import { DrinkerModule } from 'src/drinker/drinker.module';
import { DispenserSocketGateway } from './dispenser-socket.gateway';
import { SocketService } from './socket.service';
import { UserSocketGateway } from './user-socket.gateway';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => DispenserModule),
    forwardRef(() => DrinkerModule),
  ],
  controllers: [],
  exports: [SocketService],
  providers: [SocketService, UserSocketGateway, DispenserSocketGateway],
})
export class SocketModule {}
