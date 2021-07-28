import { Document } from 'mongoose';

export interface User extends Document {
  readonly name: string,
  readonly username: string,
  readonly password: string,
  readonly email: string
}
