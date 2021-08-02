import { ObjectId } from 'mongoose'

export interface Order {
  readonly userID: ObjectId;
  readonly orderDate: Date;
  readonly price: number;
  readonly status: string;
}
