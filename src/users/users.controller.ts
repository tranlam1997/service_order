import { Controller, Get, Req, Res, HttpStatus, NotFoundException, Put, Post, Body, Param, Delete, UseGuards, Inject, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LogInDto } from './dto/log-in.dto';
import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipe';
import {  Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';




@Controller('user')
export class UsersController {
  constructor( private readonly usersService: UsersService) {}


  @Get()
  async findAll( @Res() res: Response ) {
    const users = await this.usersService.findAll();
    return res.status(HttpStatus.OK).json(users); 
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async findOne( @Res() res: Response , @Param('id', new ValidateObjectId()) id: any) {
    const user = await  this.usersService.findOne(id);
    if (!user) throw new NotFoundException('User does not exist!');         
    return res.status(HttpStatus.OK).json(user);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id/update')
  async update( @Res() res: Response, @Param('id', new ValidateObjectId()) id: any, @Body() updateUserDto: UpdateUserDto) {      
    const updatedUser = await this.usersService.update(id, updateUserDto);
    return res.status(HttpStatus.OK).send({message: 'Update user successfully', user : updatedUser});
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id/delete')
  async remove( @Res() res: Response, @Param('id', new ValidateObjectId()) id: any) {
    await this.usersService.remove(id);
    return res.status(HttpStatus.OK).send({message: 'Delete user successfully'});
  }
}
