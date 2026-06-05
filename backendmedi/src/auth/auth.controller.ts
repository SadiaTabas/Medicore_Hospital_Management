import { Body, Controller, Post, HttpCode, HttpStatus, Res, UseGuards,Get } from '@nestjs/common';
import express from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { LoginDto } from 'src/doctor/dto/Login.dto';
 
 

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  
async signin(
 @Body() signInDto: LoginDto,
  @Res({ passthrough: true }) res: express.Response,
) {
  const result = await this.authService.login(
    signInDto.phone,
    signInDto.password,
  );

    res.cookie('access_token', result.access_token, {
      httpOnly: true,
      sameSite: 'none',
      secure: false,
      path: '/',
      maxAge: 300 * 60 * 1000,
    });

   return result;
  }

   
  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getProtected() {
    return 'This is protected route';
  }
}
  
