import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';
import { User } from 'src/users/interfaces/user.interface';

@Injectable()
export class DuplicateCheckingMiddleware implements NestMiddleware {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
      ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const {username, email} = req.body;
    const user = await this.userModel.findOne({username : username});
    if(user) return res.status(409).send({ message : 'Duplicate username'});
    const userEmail = await this.userModel.findOne({email : email});
    if(userEmail) return res.status(409).send({ message : 'Duplicate email'});
    next(); 
  }
}
