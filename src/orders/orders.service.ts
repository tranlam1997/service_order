import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './interfaces/order.interface';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const createdOrder = new this.orderModel(createOrderDto);
    return createdOrder.save();
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  async findOne(orderID): Promise<Order> {
    const order = await this.orderModel.findById(orderID).exec();    
    return order;  
  }

  async update(orderID, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const updatedOrder = await this.orderModel.findByIdAndUpdate(orderID, updateOrderDto, { new: true });  
    return updatedOrder;   
  }

  async remove(orderID): Promise<any> {
    const deletedOrder = await this.orderModel.findByIdAndRemove(orderID);         
    return deletedOrder; 
  }
}
