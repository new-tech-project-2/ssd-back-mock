import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DrinkerController } from './drinker/drinker.controller';
import { PingController } from './ping/ping.controller';
import { SocketGateway } from './socket/socket.gateway';
@Module({
  imports: [AuthModule],
  controllers: [PingController, DrinkerController],
  providers: [SocketGateway],
})
export class AppModule {}
