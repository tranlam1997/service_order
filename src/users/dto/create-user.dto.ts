import { IsString, IsEmail, Length, IsNotEmpty } from 'class-validator';


export class CreateUserDto  {
     @IsNotEmpty()
     @IsString({message: 'Value must be a string'})
     @Length(4, 20)
     readonly name: string;
     @IsNotEmpty()
     @IsString({message: 'Value must be a string'})
     @Length(4, 20)
     readonly username: string;
     @IsNotEmpty()
     @IsString({message: 'Value must be a string'})
     @Length(6, 15)
     readonly password: string;
     @IsNotEmpty()
     @IsString({message: 'Value must be a string'})
     @Length(10, 20)
     @IsEmail()
     readonly email: string;
}