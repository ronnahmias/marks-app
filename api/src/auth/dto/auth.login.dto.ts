import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { IAuthLogin } from '../types/auth.login.interface';

export class AuthLoginDto implements IAuthLogin {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
