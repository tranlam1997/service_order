import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/user.interface'
import * as bcrypt from 'bcrypt';
import { Order } from 'src/orders/interfaces/order.interface';
import * as mongoose from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Order') private readonly orderModel: Model<Order>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { name , username, password, email } = createUserDto;
    const hashPass = await bcrypt.hash(password, +process.env.SALT);
    const createdUser = new this.userModel({_id : new mongoose.Types.ObjectId(),name : name, username: username, password: hashPass, email: email});
    return createdUser.save();
  }

  async findAll() {
    return this.userModel.find().populate('orders').exec();
  }

  async findOne(userID: number) {
    const user = await this.userModel.findById(userID).populate('orders').exec();    
    return user;  
  }


  async findUser(username: string): Promise<User | undefined>{
    const user = await this.userModel.findOne({username : username}).exec();
    return user;

  }

  async update(userID: number, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userModel.findByIdAndUpdate(userID, updateUserDto, { new: true });  
    return updatedUser; 
  }

  async remove(userID: number) {
    const deletedUser = await this.userModel.findByIdAndRemove(userID);
    await this.orderModel.remove({ userID : userID});   
    return deletedUser; 
  }
}
