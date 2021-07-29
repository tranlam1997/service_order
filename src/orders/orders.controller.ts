import { Controller, Get, Res, HttpStatus, NotFoundException, Put, Post, Body, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Response } from 'express';   
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import {GetUserAuthInfoRequest} from './interfaces/request.interface'

@UseGuards(JwtAuthGuard)
@ApiTags('user/order')
@ApiBearerAuth()
@Controller('user/order')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  
  @Post()
  @ApiBody({
    type: CreateOrderDto
  })
  @ApiResponse({ status: 201, description: 'The order has been successfully created.'})
  @ApiResponse({ status: 500, description: 'Can\'t create order. Internal server error'})
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  async create(@Req() req: GetUserAuthInfoRequest,  @Res() res: Response , @Body() createOrderDto: CreateOrderDto) {
    const userID : string = req.user.userID;
    const newOrder = await  this.ordersService.create(userID, createOrderDto);
    return res.status(HttpStatus.CREATED).json({ message: "Order has been created successfully!", order: newOrder });
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Retrieve all orders successfully.'})
  @ApiResponse({ status: 500, description: 'Can\'t retrieve all orders. Internal server error'})
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  async findAll( @Res() res: Response ) {
    const orders = await this.ordersService.findAll();
    return res.status(HttpStatus.OK).json(orders); 
  }

  @Get('/:id')
  @ApiParam({ name : 'id'})
  @ApiResponse({ status: 201, description: 'Order found'})
  @ApiResponse({ status: 404, description: 'Order not found'})
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  async findOne( @Res() res: Response , @Param('id', new ValidateObjectId()) id: any) {
    const order = await  this.ordersService.findOne(id);
    if (!order) throw new NotFoundException('Order does not exist!');         
    return res.status(HttpStatus.OK).json(order);
  }

  @Put('/:id/update')
  @ApiBody({
    type: UpdateOrderDto
  })
  @ApiParam({ name : 'id'})
  @ApiResponse({ status: 201, description: 'Update order successfully'})
  @ApiResponse({ status: 500, description: 'Can\'t update order. Internal server error'})
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  async update( @Res() res: Response, @Param('id', new ValidateObjectId()) id: any, @Body() updateOrderDto: UpdateOrderDto) {      
    const updatedOrder = await this.ordersService.update(id, updateOrderDto);
    return res.status(HttpStatus.OK).send({message: 'Update order successfully', order : updatedOrder});
  }

  @Delete('/:id/delete')
  @ApiParam({name : 'id'})
  @ApiResponse({ status: 200, description: 'Delete order successfully'})
  @ApiResponse({ status: 500, description: 'Can\'t delete order. Internal server error'})
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  async remove( @Res() res: Response, @Param('id', new ValidateObjectId()) id: any) {
    await this.ordersService.remove(id);
    return res.status(HttpStatus.OK).send({message: 'Delete order successfully'});
  }
}
