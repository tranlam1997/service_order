import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/user.interface'
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { name , username, password, email } = createUserDto;
    const hashPass = await bcrypt.hash(password, +process.env.SALT);
    const createdUser = new this.userModel({name : name, username: username, password: hashPass, email: email});
    return createdUser.save();
  }

  async findAll() {
    return this.userModel.find().exec();
  }

  async findOne(userID: number) {
    const user = await this.userModel.findById(userID).exec();    
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
    return deletedUser; 
  }
}
