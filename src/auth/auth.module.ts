import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { DispensersModule } from 'src/dispensers/dispensers.module';
import { UsersModule } from 'src/users/users.module';
import { AuthTokenStrategy } from './auth-token.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule, UsersModule, DispensersModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECERET'),
        signOptions: { expiresIn: '60s' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthTokenStrategy],
})
export class AuthModule {}
