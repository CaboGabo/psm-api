import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/login')
  @UseGuards(AuthGuard('local'))
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
