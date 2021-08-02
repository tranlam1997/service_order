import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { OrderDocument } from 'src/orders/schemas/order.schema';
import { User, UserDocument } from './schemas/user.schema';
import * as mongoose from 'mongoose';


@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
    @InjectModel('Order') private readonly orderModel: Model<OrderDocument>
  ) {}

  async create(createUserDto: CreateUserDto) : Promise<User> {
    const { name , username, password, email } = createUserDto;
    const hashPass = await bcrypt.hash(password, +process.env.SALT);
    const createdUser = new this.userModel({_id: new mongoose.Types.ObjectId, name : name, username: username, password: hashPass, email: email});
    return createdUser.save();
  }

  async findAll() : Promise<User[] | undefined> {
    return this.userModel.find().populate('orders').exec();
  }

  async findUserById(userID: string): Promise<User | undefined> {
    const user = await this.userModel.findById(userID).populate('orders').exec();    
    return user;  
  }


  async findUserByUsername(username: string): Promise<User | undefined>{
    const user = await this.userModel.findOne({username : username}).exec();
    return user;

  }

  async updateUser(userID: string, updateUserDto: UpdateUserDto) : Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(userID, updateUserDto, { new: true, useFindAndModify: false });  
    return updatedUser; 
  }

  async deleteUser(userID: any): Promise<any> {
    const deletedUser = await this.userModel.findByIdAndRemove(userID, {useFindAndModify: false});
    await this.orderModel.deleteOne({ userID : userID});   
    return deletedUser; 
  }
}
