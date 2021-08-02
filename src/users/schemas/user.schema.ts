import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';


export type UserDocument = User & mongoose.Document;

@Schema()
 export class User {
    @Prop()
    _id?: string
    
    @Prop()
    name: string;

    @Prop()
    username: string;

    @Prop()
    password: string;

    @Prop()
    email: string

    @Prop({ type: [String], ref: 'Order'})
    orders: string[]
}

export const UserSchema = SchemaFactory.createForClass(User);
