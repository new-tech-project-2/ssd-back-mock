import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { DrinkerModule } from './drinker/drinker.module';
import { LoggerMiddleware } from './middlewares/logger';
import { MongodbConfigService } from './mongodb/mongodb.config.service';
import { PingController } from './ping/ping.controller';

import { SocketModule } from './socket/socket.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
