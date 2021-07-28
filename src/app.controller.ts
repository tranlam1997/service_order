import { Body, Controller, Get, Post, Req, Res, UseGuards, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './users/dto/create-user.dto';
import { Request, Response } from 'express';
import { UsersService } from './users/users.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly usersService: UsersService, private authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/register')
  async create( @Res() res: Response , @Body() createUserDto: CreateUserDto) {
    const newUser = await  this.usersService.create(createUserDto);
    return res.status(HttpStatus.CREATED).json({ message: "User has been created successfully!", user: newUser });
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login( @Req() req : Request) {
    return  this.authService.login(req.user)
  }
}
