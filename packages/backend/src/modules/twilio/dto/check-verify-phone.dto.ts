import {
  IsNotEmpty, IsString
} from 'class-validator'
import {
  VerifyPhoneDto
} from './verify-phone.dto'

export class CheckVerifyPhoneDto extends VerifyPhoneDto {
  @IsString()
  @IsNotEmpty()
  public code!: string
}
