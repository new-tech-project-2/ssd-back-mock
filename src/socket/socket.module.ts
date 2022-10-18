import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { DispenserSocketGateway } from './dispenser-socket.gateway';
import { SocketService } from './socket.service';
import { UserSocketGateway } from './user-socket.gateway';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [],
  exports: [SocketService],
  providers: [SocketService, UserSocketGateway, DispenserSocketGateway],
})
export class SocketModule {}
