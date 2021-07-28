import { IsString, Length, IsNotEmpty } from 'class-validator';


export class LogInDto  {
     @IsNotEmpty()
     @IsString({message: 'Value must be a string'})
     @Length(4, 20)
     readonly username: string;
     @IsNotEmpty()
     @IsString({message: 'Value must be a string'})
     @Length(6, 15)
     readonly password: string;
}