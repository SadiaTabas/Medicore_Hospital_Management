import {
  IsDefined,
  IsNotEmpty,
  IsString,
  IsInt,
  IsPositive,
  MinLength,
  Matches,
  IsOptional
} from 'class-validator';
import { Type } from 'class-transformer';

export class DoctorDto {

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z\s.]+$/, { message: 'Name can contain letters, space and dot' })
  name: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  specialization: string;

  @IsDefined()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  experience: number;

  @IsDefined()
  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*[a-z]).*$/)
  password: string;


  
  @IsDefined()
  @Matches(/^01[0-9]{9}$/, { message: 'Invalid phone number' })
  phone: string;

  @IsOptional()
  @IsString()
  file?: string;

}