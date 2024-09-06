import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator'
import {
  IsMatchFields
} from '../decorators/is-match-fields.decorator'
import {
  ERROR_MESSAGES
} from '../../common/consts/error.const'
import {
  UserRole
} from '../../user/types/user.types'

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  public name!: string

  @IsEmail()
  @IsNotEmpty()
  public email!: string

  @IsPhoneNumber('UA')
  @IsNotEmpty()
  public phone_number!: string

  @IsNotEmpty()
  @IsString()
  public password!: string

  @IsNotEmpty()
  @IsString()
  @IsMatchFields('password', {
    message: ERROR_MESSAGES.PASSWORD_MATCH,
  })
  public password_confirm!: string

  @IsEnum(UserRole)
  @IsNotEmpty()
  public role!: UserRole
}
