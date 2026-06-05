import { IsString, IsNotEmpty } from 'class-validator';

export class AppointmentDto {
  @IsNotEmpty()
  @IsString()
  patientName: string;

  @IsNotEmpty()
  @IsString()
  date: string;
}