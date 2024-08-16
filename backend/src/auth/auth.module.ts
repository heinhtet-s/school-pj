import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { PrismaService } from 'src/prisma.service';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'wfwef',

      signOptions: { expiresIn: '60days' },
    }),
  ],
  providers: [AuthService, JwtStrategy, PrismaService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
