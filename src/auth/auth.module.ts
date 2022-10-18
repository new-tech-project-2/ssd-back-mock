import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { SocketModule } from '../socket/socket.module';
import { AuthWebGuard } from './auth-web.guard';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
@Module({
  imports: [
    ConfigModule,
    SocketModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECERET'),
          signOptions: { expiresIn: 60 * 30 },
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [AuthService],
  controllers: [AuthController],
  providers: [AuthService, AuthWebGuard],
})
export class AuthModule {}
