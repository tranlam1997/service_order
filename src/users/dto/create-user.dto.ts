import { IsString, IsEmail, Length, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto  {
     @ApiProperty({
         type: String
     })
     @IsNotEmpty()
     @IsString({message: 'Value must be a string'})
     @Length(4, 20)
     readonly name: string;
     @ApiProperty({
         type: String
     })
     @IsNotEmpty()
     @IsString({message: 'Value must be a string'})
     @Length(4, 20)
     readonly username: string;
     @ApiProperty({
         type: String
     })
     @IsNotEmpty()
     @IsString({message: 'Value must be a string'})
     @Length(6, 15)
     readonly password: string;
     @ApiProperty({
         type: String
     })
     @IsNotEmpty()
     @IsString({message: 'Value must be a string'})
     @Length(10, 20)
     @IsEmail()
     readonly email: string;
}