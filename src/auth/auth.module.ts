import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SocketModule } from 'src/socket/socket.module';

import { AuthTokenStrategy } from './auth-token.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
@Module({
  imports: [
    SocketModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECERET'),
          signOptions: { expiresIn: '60s' },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthTokenStrategy],
})
export class AuthModule {}
