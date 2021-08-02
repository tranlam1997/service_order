import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema()
 export class Order {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    userID: mongoose.Schema.Types.ObjectId;

    @Prop({ type : Date, default: new Date()})
    orderDate: Date;

    @Prop()
    price: number;

    @Prop()
    status: string
}

export const OrderSchema = SchemaFactory.createForClass(Order);