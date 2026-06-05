import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Appointment } from './appointment.entity';
import { DoctorProfile } from './doctor-profile.entity';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Appointment, appointment => appointment.doctor, {
    cascade: true,  // cascade stays here only
  })
  appointments: Appointment[];

  @OneToOne(() => DoctorProfile, profile => profile.doctor, {
  cascade: true,
  onDelete: 'CASCADE',
})
  @JoinColumn()
  profile: DoctorProfile;

  @Column()
  name: string;

  @Column()
  specialization: string;

  @Column()
  experience: number;

  @Column()
  password: string;

  @Column({unique:true} )
  phone: string;

  @Column({ nullable: true })
  file: string;
}