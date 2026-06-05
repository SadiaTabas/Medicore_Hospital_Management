import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, MoreThanOrEqual } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Doctor } from './entities/doctor.entity';
import { Appointment } from './entities/appointment.entity';
import { DoctorProfile } from './entities/doctor-profile.entity';

import { DoctorDto } from './dto/doctor.dto';
import { AppointmentDto } from './dto/appointment.dto';
import { CreateDoctorProfileDto } from './dto/doctor-profile.dto';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private doctorRepo: Repository<Doctor>,

    @InjectRepository(Appointment)
    private appointmentRepo: Repository<Appointment>,

    @InjectRepository(DoctorProfile)
    private profileRepo: Repository<DoctorProfile>,
  ) {}


  
  async getAllDoctorsinfo(): Promise<object> {
    try {
      const doctors = await this.doctorRepo.find();
      return { doctors };
    } catch (error) {
      throw new HttpException('Failed to fetch doctors', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

   
  async getDoctorById(id: number): Promise<any> {
    const doctor = await this.doctorRepo.findOne({ where: { id } });

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    return doctor;
  }


  async getDoctorByPhone(phone: string) {

    return await this.doctorRepo.findOne({
      where: { phone },
    });

  }
   
  async createDoctor(data: DoctorDto) {
    try {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);

      const doctor = this.doctorRepo.create(data);
      await this.doctorRepo.save(doctor);

      return { message: 'Doctor created', id: doctor.id,
    name: doctor.name, };
    } catch (error) {
      throw new HttpException(
        'Failed to create doctor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  

   
  async updateDoctor(id: number, data: DoctorDto): Promise<object> {
    const doctor = await this.doctorRepo.findOne({ where: { id } });

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    
    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);
    }

    Object.assign(doctor, data);
    await this.doctorRepo.save(doctor);

    return { message: 'Doctor updated successfully', doctor };
  }

   
  async patchDoctor(id: number, data: Partial<DoctorDto>): Promise<object> {
    const doctor = await this.doctorRepo.findOne({ where: { id } });

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);
    }

    Object.assign(doctor, data);
    await this.doctorRepo.save(doctor);

    return { message: 'Doctor patched successfully', doctor };
  }

   
  async deleteDoctor(id: number): Promise<object> {
    const doctor = await this.doctorRepo.findOne({ where: { id } });

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    await this.doctorRepo.remove(doctor);

    return { message: 'Doctor deleted successfully' };
  }

   
  async searchDoctorByName(name: string): Promise<object> {
    const result = await this.doctorRepo.find({
      where: { name: Like(`%${name}%`) },
    });

    return { result };
  }

   
  async getDoctorByExperience(exp: number): Promise<object> {
    const result = await this.doctorRepo.find({
      where: { experience: MoreThanOrEqual(exp) },
    });

    return { result };
  }






async createAppointment(doctorId: number, dto: AppointmentDto) {
    const doctor = await this.doctorRepo.findOne({ where: { id: doctorId } });
    if (!doctor) throw new NotFoundException('Doctor not found');

    const appointment = this.appointmentRepo.create(dto);
    appointment.doctor = doctor;

    await this.appointmentRepo.save(appointment);
    return { message: 'Appointment created', appointment };
  }

  async getAppointments() {
    return this.appointmentRepo.find({ relations: ['doctor'] });
  }

  async deleteAppointment(id: number) {
    const appointment = await this.appointmentRepo.findOne({ where: { id } });
    if (!appointment) throw new NotFoundException('Appointment not found');

    await this.appointmentRepo.remove(appointment);
    return { message: 'Appointment deleted' };
  }

  async getAppointmentsByDoctor(doctorId: number) {
    return this.appointmentRepo.find({
      where: { doctor: { id: doctorId } },
      relations: ['doctor'],
    });
  }



  



  async createProfile(doctorId: number, dto: CreateDoctorProfileDto): Promise<DoctorProfile> {
    const doctor = await this.doctorRepo.findOneBy({ id: doctorId });
    if (!doctor) throw new NotFoundException('Doctor not found');

    const profile = this.profileRepo.create(dto);
    profile.doctor = doctor;

    return this.profileRepo.save(profile);
  }

  async getDoctorByIdWithProfile(id: number) {
  const doctor = await this.doctorRepo.findOne({
    where: { id },
    relations: ['profile'],  
  });

  if (!doctor) {
    throw new NotFoundException('Doctor not found');
  }

  return doctor;
}


}


