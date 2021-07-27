import { Controller, Get, Res, HttpStatus, NotFoundException, Put, Post, Body, Param, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ValidateObjectId } from './shared/pipes/validate-object-id.pipes';   

@Controller('order')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create( @Res() res , @Body() createOrderDto: CreateOrderDto) {
    const newOrder = await  this.ordersService.create(createOrderDto);
    return res.status(HttpStatus.OK).json({ message: "Order has been created successfully!", order: newOrder });
  }

  @Get('allOrders')
  async findAll( @Res() res ) {
    const orders = await this.ordersService.findAll();
    return res.status(HttpStatus.OK).json(orders); 
  }

  @Get('/:id')
  async findOne( @Res() res , @Param('id', new ValidateObjectId()) id: any) {
    const order = await  this.ordersService.findOne(id);
    if (!order) throw new NotFoundException('Order does not exist!');         
    return res.status(HttpStatus.OK).json(order);
  }

  @Put('/:id/update')
  async update( @Res() res, @Param('id', new ValidateObjectId()) id: any, @Body() updateOrderDto: UpdateOrderDto) {      
    const updatedOrder = await this.ordersService.update(id, updateOrderDto);
    return res.status(HttpStatus.OK).send({message: 'Update order successfully', order : updatedOrder});
  }

  @Delete('/:id/delete')
  async remove( @Res() res, @Param('id', new ValidateObjectId()) id: any) {
    await this.ordersService.remove(id);
    return res.status(HttpStatus.OK).send({message: 'Delete order successfully'});
  }
}
