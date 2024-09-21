import {
  IsPhoneNumber, IsString
} from 'class-validator'

export class VerifyPhoneDto {
  @IsString()
  @IsPhoneNumber('UA')
  public phone_number!: string
}
