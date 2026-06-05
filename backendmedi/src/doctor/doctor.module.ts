// doctor.module.ts
import { Module } from '@nestjs/common';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { Appointment } from './entities/appointment.entity';
import { DoctorProfile } from './entities/doctor-profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Doctor, Appointment, DoctorProfile]),
     
  ],
  controllers: [DoctorController],
  providers: [DoctorService],
  exports: [DoctorService],
})
export class DoctorModule {}