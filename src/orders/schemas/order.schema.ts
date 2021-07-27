import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
  customerID: String,
  orderDate: Date,
  price: Number,
  status: String
});
