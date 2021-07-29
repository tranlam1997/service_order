import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  orderDate: {
    type: Date,
    default : new Date()
  },
  price: Number,
  status: String
});
