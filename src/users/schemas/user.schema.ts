import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    name: string;

    @Prop()
    username: string;

    @Prop()
    password: string;

    @Prop()
    email: string

    @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Order'})
    orders: [mongoose.Schema.Types.ObjectId]
}

export const UserSchema = SchemaFactory.createForClass(User);
