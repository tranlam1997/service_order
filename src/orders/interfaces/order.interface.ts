import { Document, ObjectId } from 'mongoose';

export interface Order extends Document {
  readonly userID: ObjectId;
  readonly orderDate: Date;
  readonly price: number;
  readonly status: string;
}
