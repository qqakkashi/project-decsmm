import {
  HttpException, HttpStatus, Injectable
} from '@nestjs/common'
import {
  Response
} from 'express'
import {
  RegisterDto
} from './dtos/register.dto'
import {
  PrismaService
} from '../prisma/prisma.service'
import {
  ERROR_MESSAGES
} from '../common/consts/error.const'
import * as bcrypt from 'bcrypt'
import {
  JWTAuthService
} from '../common/jwt/jwt-auth.service'
import {
  UserWithoutPassword
} from '../user/types/user.types'
import {
  LoginDto
} from './dtos/login.dto'
import {
  USER_BASE_SELECT
} from '../user/const/user.const'

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtAuthService: JWTAuthService,
  ) {}

  private async isUserExistValidator(
    name: string,
    email: string,
  ): Promise<Record<'message', string>> | null {
    const isRecordExist = await this.prisma.user.findFirst({
      where: {
        OR: [
          {
            name,
          },
          {
            email,
          },
        ],
      },
    })
    if (isRecordExist) {
      const {
        name: foundedName,
        email: foundedEmail,
      } = isRecordExist
      switch (true) {
      case foundedName === name:
        return {
          message: ERROR_MESSAGES.NAME_EXIST,
        }
      case foundedEmail === email:
        return {
          message: ERROR_MESSAGES.EMAIL_EXIST,
        }
      default:
        return null
      }
    }
    return null
  }

  public async register(
    registerData: Omit<RegisterDto, 'password_confirm'>,
    response:Response
  ): Promise<void> {
    const {
      name, email, phone_number, password, role
    } = registerData
    const isUserExistError = await this.isUserExistValidator(
      name,
      email,
    )
    if (isUserExistError !== null) {
      throw new HttpException(isUserExistError.message, HttpStatus.BAD_REQUEST)
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        phone_number,
        password: hashedPassword,
        role,
      },
      select: USER_BASE_SELECT,
    })
    const {
      accessToken,
      refreshToken
    } = await this.jwtAuthService.generateTokens({
      id: user.id,
    })
    response.setHeader('authorization',`Bearer ${accessToken}`)
    response.setHeader('x-refresh-token', refreshToken)
    response.json(user).status(HttpStatus.OK)
  }

  public async login(loginData: LoginDto, response: Response): Promise<void> {
    const {
      email,
      password
    } = loginData
    const user =
      await this.prisma.user.findFirst({
        where: {
          email,
        },
      })
    if (!user) {
      throw new HttpException(
        ERROR_MESSAGES.USER_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      )
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new HttpException(
        ERROR_MESSAGES.PASSWORD_WRONG,
        HttpStatus.BAD_REQUEST,
      )
    }
    const {
      accessToken,
      refreshToken
    } = await this.jwtAuthService.generateTokens({
      id: user.id,
    })
    response.setHeader('authorization',`Bearer ${accessToken}`)
    response.setHeader('x-refresh-token', refreshToken)
    response.json(user).status(HttpStatus.OK)
  }

  public async logout(id: string, response: Response): Promise<boolean> {
    const isUserExist = await this.prisma.user.findFirst({
      where: {
        id,
      },
    })
    if (!isUserExist) {
      throw new HttpException(
        ERROR_MESSAGES.USER_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      )
    }
    response.setHeader('authorization', '')
    response.setHeader('x-refresh-token', '')
    return true
  }

  public async me(id: string): Promise<UserWithoutPassword> {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
      select: USER_BASE_SELECT,
    })
    if (!user) {
      throw new HttpException(
        ERROR_MESSAGES.USER_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      )
    }
    return user
  }
}
