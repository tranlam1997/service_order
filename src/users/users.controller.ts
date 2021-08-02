import { Controller, Get, Res, HttpStatus, Put, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ValidateObjectId } from '../utilities/pipes/validate-object-id.pipe';
import {  Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';



@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor( private readonly usersService: UsersService) {}


  @Get()
  @ApiResponse({ status: 200, description: 'The user has been successfully retrieved.'})
  @ApiResponse({ status: 500, description: 'Can\'t retrieve users. Internal server error'})
  async findAll( @Res() res: Response) {
    const users = await this.usersService.findAll();
    return res.status(HttpStatus.OK).json(users); 
  }


  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  @ApiParam({ name : 'id'})
  @ApiResponse({ status: 200, description: 'The user has been found.'})
  @ApiResponse({ status: 404, description: 'User not found'})
  async findUserById( @Res() res: Response , @Param('id', new ValidateObjectId()) id: string) {
    const user = await  this.usersService.findUserById(id);    
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
  async updateUser( @Res() res: Response, @Param('id', new ValidateObjectId()) id: string, @Body() updateUserDto: UpdateUserDto) {      
    const updatedUser = await this.usersService.updateUser(id, updateUserDto);
    return res.status(HttpStatus.OK).send({message: 'Update user successfully', user : updatedUser});
  }


  @UseGuards(JwtAuthGuard)
  @Delete('/:id/delete')
  @ApiParam({ name : 'id'})
  @ApiResponse({ status: 200, description: 'The user has been successfully deleted.'})
  @ApiResponse({ status: 500, description: 'Can\'t delete user. Internal server error'})
  async deleteUser( @Res() res: Response, @Param('id', new ValidateObjectId()) id: any) {
    const deletedUser = await this.usersService.deleteUser(id);
    return res.status(HttpStatus.OK).send({message: 'Delete user successfully', user : deletedUser});
  }
}
