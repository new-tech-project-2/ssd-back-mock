import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { DrinkerModule } from './drinker/drinker.module';
import { MongodbConfigService } from './mongodb/mongodb.config.service';
import { PingController } from './ping/ping.controller';
import { SocketGateway } from './socket/socket.gateway';
import { UsersModule } from './users/users.module';
import { DispensersModule } from './dispensers/dispensers.module';
import { UserSocketGateway } from './user-socket.gateway';
import { DispenserSocketGateway } from './dispenser-socket.gateway';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.production.env'
          : process.env.NODE_ENV === 'stage'
          ? '.stage.env'
          : '.development.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongodbConfigService,
    }),
    AuthModule,
    DrinkerModule,
    UsersModule,
    DispensersModule,
  ],
  controllers: [PingController],
  providers: [SocketGateway, UserSocketGateway, DispenserSocketGateway],
})
export class AppModule {}
