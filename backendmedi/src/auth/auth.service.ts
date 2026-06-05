import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DoctorService } from '../doctor/doctor.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private doctorService: DoctorService,
    private jwtService: JwtService,
  ) {}

  async login(phone: string, password: string) {
    try {
      const doctor: any =   await this.doctorService.getDoctorByPhone(phone);

      if (!doctor) {

        throw new HttpException(
          'Doctor not found',
          HttpStatus.UNAUTHORIZED,
        );}

      const isMatch = await bcrypt.compare(password, doctor.password);

      if (!isMatch) {
        throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
      }

      const payload = { id: doctor.id, name: doctor.name };

      return {
        message: 'Login successful',
        access_token: this.jwtService.sign(payload),
         id: doctor.id,
  name: doctor.name,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Login failed',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}