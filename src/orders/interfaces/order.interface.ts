import { Document } from 'mongoose';

export interface Order extends Document {
  readonly customerID: number;
  readonly orderDate: Date;
  readonly price: number;
  readonly status: string;
}
