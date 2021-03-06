import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order,OrderDocument } from './schemas/order.schema';
import { UserDocument } from 'src/users/schemas/user.schema';



@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<OrderDocument>,
    @InjectModel('User') private readonly userModel: Model<UserDocument>
  ) {}

  async create(userID: string, createOrderDto: CreateOrderDto): Promise<Order> {
    const { orderDate, status, price } = createOrderDto;
    const user = await  this.userModel.findById(userID);
    const createdOrder = new this.orderModel({
      userID : userID,
      orderDate : orderDate,
      status: status,
      price: price
    }); 
    user.orders.push(createdOrder._id);
    await user.save();
    return createdOrder.save();
  }

  async findAll(): Promise<Order[] | undefined> {
    return this.orderModel.find().exec();
  }

  async findOne(orderID: number): Promise<Order | undefined> {
    const order = await this.orderModel.findById(orderID).exec();    
    return order;  
  }

  async update(orderID: number, updateOrderDto: UpdateOrderDto): Promise<Order | undefined> {
    const updatedOrder = await this.orderModel.findByIdAndUpdate(orderID, updateOrderDto, { new: true, useFindAndModify: false });  
    return updatedOrder;   
  }

  async remove(orderID: number): Promise<any> {
    const deletedOrder = await this.orderModel.findByIdAndRemove(orderID, {useFindAndModify: false});         
    return deletedOrder; 
  }
}
