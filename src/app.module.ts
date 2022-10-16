import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { DrinkerModule } from './drinker/drinker.module';
import { MongodbConfigService } from './mongodb/mongodb.config.service';
import { PingController } from './ping/ping.controller';

import { SocketModule } from './socket/socket.module';
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
    SocketModule,
  ],
  controllers: [PingController],
  providers: [],
})
export class AppModule {}
