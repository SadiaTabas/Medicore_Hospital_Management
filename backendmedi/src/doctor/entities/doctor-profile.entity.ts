import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Doctor } from './doctor.entity';

@Entity()
export class DoctorProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column()
  hospital: string;

  @OneToOne(() => Doctor, (doctor) => doctor.profile)
  doctor: Doctor;
}