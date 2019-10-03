import { Controller, Post, UsePipes, Body, Query, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { ValidationPipe } from '../shared/validation.pipe';
import { UserDTO } from './user.dto';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('api/users')
  showAllUsers() {
    return this.usersService.showAll();
  }

  @Post('auth/register')
  @UsePipes(new ValidationPipe())
  register(@Body() data: UserDTO) {
    return this.usersService.register(data);
  }
}
