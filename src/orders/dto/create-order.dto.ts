import { IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateOrderDto  {
    
    @ApiProperty({
        type: Date
    })
    readonly orderDate: Date;
    @ApiProperty({
        type: Number
    })
    @IsInt({message: 'Value must be a number'}) 
    readonly price: number;
    @ApiProperty({
        type: String
    })
    @IsString({message: 'Value must be a string'}) 
    readonly status: string;
}
  