 import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateDoctorProfileDto {
  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  hospital: string;
}