import {  Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
        constructor(
          private usersService: UsersService,
          private jwtService: JwtService
        ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    let passIsValid;
    const user = await this.usersService.findUserByUsername(username);
    if(user){
     passIsValid = await bcrypt.compare(pass, user.password);
     if(passIsValid)
     return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, userID: user._id};
    return {
      message: 'Log in successfully',
      access_token: this.jwtService.sign(payload),
    };
  }
}
