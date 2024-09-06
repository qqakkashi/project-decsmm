import {
  IsEmail, IsNotEmpty, IsString
} from 'class-validator'

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  public email!: string

  @IsNotEmpty()
  @IsString()
  public password!: string
}
