import { Body, Controller, Get, Post, Req, Res, UseGuards, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './users/dto/create-user.dto';
import { UserLoginDto } from './users/dto/user-log-in.dto';
import { Request, Response } from 'express';
import { UsersService } from './users/users.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly usersService: UsersService, private authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  
  @Post('/register')
  @ApiBody({
    type : CreateUserDto
  })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  @ApiResponse({ status: 409, description: 'Username or email existed' })
  @ApiResponse({ status: 500, description: 'Can\'t create users. Internal server error'})
  async create( @Res() res: Response , @Body() createUserDto: CreateUserDto) {
    const newUser = await  this.usersService.create(createUserDto);
    return res.status(HttpStatus.CREATED).json({ message: "User has been created successfully!", user: newUser });
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiBody({ type: UserLoginDto, })
  @ApiResponse({ status: 200, description: 'Log in successfully.'})
  @ApiResponse({ status: 401, description: 'Username or password is wrong'})
  async login( @Req() req : Request) {
    return  this.authService.login(req.user)
  }
}
