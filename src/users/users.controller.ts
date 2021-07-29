import { Controller, Get, Req, Res, HttpStatus, NotFoundException, Put, Body, Param, Delete, UseGuards, Inject, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipe';
import {  Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';



@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor( private readonly usersService: UsersService) {}


  @Get()
  @ApiResponse({ status: 200, description: 'The user has been successfully retrieved.'})
  @ApiResponse({ status: 500, description: 'Can\'t retrieve users. Internal server error'})
  async findAll( @Res() res: Response ) {
    const users = await this.usersService.findAll();
    return res.status(HttpStatus.OK).json(users); 
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  @ApiParam({ name : 'id'})
  @ApiResponse({ status: 200, description: 'The user has been found.'})
  @ApiResponse({ status: 404, description: 'User not found'})
  async findOne( @Res() res: Response , @Param('id', new ValidateObjectId()) id: any) {
    const user = await  this.usersService.findOne(id);
    if (!user) throw new NotFoundException('User does not exist!');         
    return res.status(HttpStatus.OK).json(user);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id/update')
  @ApiBody({
    type: UpdateUserDto
  })
  @ApiParam({ name : 'id'})
  @ApiResponse({ status: 201, description: 'The user has been successfully updated.'})
  @ApiResponse({ status: 500, description: 'Can\'t update user. Internal server error'})
  async update( @Res() res: Response, @Param('id', new ValidateObjectId()) id: any, @Body() updateUserDto: UpdateUserDto) {      
    const updatedUser = await this.usersService.update(id, updateUserDto);
    return res.status(HttpStatus.OK).send({message: 'Update user successfully', user : updatedUser});
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id/delete')
  @ApiParam({ name : 'id'})
  @ApiResponse({ status: 200, description: 'The user has been successfully deleted.'})
  @ApiResponse({ status: 500, description: 'Can\'t delete user. Internal server error'})
  async remove( @Res() res: Response, @Param('id', new ValidateObjectId()) id: any) {
    await this.usersService.remove(id);
    return res.status(HttpStatus.OK).send({message: 'Delete user successfully'});
  }
}
