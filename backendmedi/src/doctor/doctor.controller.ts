import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Patch,
  Delete,
  Query,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, MulterError } from 'multer';
import { DoctorService } from './doctor.service';
import { DoctorDto } from './dto/doctor.dto';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';

import { AppointmentDto } from './dto/appointment.dto';
import { CreateDoctorProfileDto } from './dto/doctor-profile.dto';
import { UpdateDoctorDto } from './dto/UpdateDoctor.dto';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

   
  
  @Get()
  async getAllDoctorsinfo() {
    return this.doctorService.getAllDoctorsinfo();
  }

  @Get('search/name')
  async searchDoctor(@Query('name') name: string) {
    return await this.doctorService.searchDoctorByName(name);
  }

  @Get('search/experience')
  async searchDoctorExperience(@Query('exp') exp: string) {
    return await this.doctorService.getDoctorByExperience(Number(exp));
  }

   
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/^.*\.pdf$/)) {
          return cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'file'), false);
        }
        cb(null, true);
      },
      limits: { fileSize: 3_000_00000 },
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, Date.now() + '-' + file.originalname);
        },
      }),
    }),
  )
  async createDoctor(
    @Body() data: DoctorDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('PDF file is required');
    }
    data.file = file.filename;
    return await this.doctorService.createDoctor(data);
  }

   
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getDoctorById(@Param('id') id: string) {
    return await this.doctorService.getDoctorById(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateDoctor(@Param('id') id: string, @Body() data: DoctorDto) {
    return await this.doctorService.updateDoctor(Number(id), data);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async patchDoctor(
    @Param('id') id: string,
    @Body() data: UpdateDoctorDto,
  ) {
    return await this.doctorService.patchDoctor(Number(id), data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteDoctor(@Param('id') id: string) {
    return await this.doctorService.deleteDoctor(Number(id));
  }
@UseGuards(JwtAuthGuard)
   @Post(':id/appointment')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  createAppointment(
    @Param('id') doctorId: string,
    @Body() dto: AppointmentDto,
  ) {
    return this.doctorService.createAppointment(Number(doctorId), dto);
  }

  @UseGuards(JwtAuthGuard) 
  @Get(':id/appointment')
  getAppointmentsByDoctor(@Param('id') id: string) {
    return this.doctorService.getAppointmentsByDoctor(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Delete('appointment/:id')
  deleteAppointment(@Param('id') id: string) {
    return this.doctorService.deleteAppointment(Number(id));
  }


   @Post(':id/profile')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  createProfile(
    @Param('id') doctorId: string,
    @Body() dto: CreateDoctorProfileDto,
  ) {
    return this.doctorService.createProfile(Number(doctorId), dto);
  }

  @Get(':id/profile')
  getProfile(@Param('id') id: string) {
    return this.doctorService.getDoctorByIdWithProfile(Number(id));
  }
}