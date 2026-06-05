import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DoctorModule } from '../doctor/doctor.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    DoctorModule,
    JwtModule.register({
      secret: 'secretKey123',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}