import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { DrinkerModule } from './drinker/drinker.module';
import { MongodbConfigService } from './mongodb/mongodb.config.service';
import { PingController } from './ping/ping.controller';

import { DispensersModule } from './dispensers/dispensers.module';
import { SocketModule } from './socket/socket.module';
import { UsersModule } from './users/users.module';
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
    SocketModule,
  ],
  controllers: [PingController],
  providers: [],
})
export class AppModule {}
