// auth/auth.controller.ts
import { Controller, Request, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { CreateUserDto, LoginUserDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() LoginUserDto: LoginUserDto) {
    console.log('hello');
    return this.authService.login(LoginUserDto);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);

    return this.authService.register(createUserDto);
  }
}
