import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  username: String,
  password: String,
  email: String,
  orders : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
});
