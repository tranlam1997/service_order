import { IsString, IsInt, IsDate } from 'class-validator';

export class CreateOrderDto  {
    
    @IsInt({message: 'Value must be a number'}) readonly customerID: number;
    @IsDate({message: 'Value must be a date'}) readonly orderDate: Date;
    @IsInt({message: 'Value must be a number'}) readonly price: number;
    @IsString({message: 'Value must be a string'}) readonly status: string;
}
  