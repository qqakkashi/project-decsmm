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
  AUTH_MESSAGES
} from '../common/consts/auth.const'
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
    // phone_number: string,
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
          // {
          //   phone_number,
          // },
        ],
      },
    })
    if (isRecordExist) {
      const {
        name: foundedName,
        email: foundedEmail,
        // phone_number: foundedPhoneNumber,
      } = isRecordExist
      // eslint-disable-next-line default-case
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
        // case foundedPhoneNumber === phone_number:
        //   return {
        //     message: ERROR_MESSAGES.PHONE_EXIST,
        //   };
      }
    }
    return null
  }

  public async register(
    registerData: Omit<RegisterDto, 'password_confirm'>,
    response: Response,
  ): Promise<void> {
    const {
      name, email, phone_number, password, role
    } = registerData
    const isUserExistError = await this.isUserExistValidator(
      name,
      email,
      // phone_number,
    )
    if (isUserExistError !== null) {
      throw new HttpException(isUserExistError.message, HttpStatus.BAD_REQUEST)
    }
    const hashedPassowrd = await bcrypt.hash(password, 10)
    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        phone_number,
        password: hashedPassowrd,
        role,
      },
      select: USER_BASE_SELECT,
    })
    const {
      accessToken, refreshToken
    } =
      await this.jwtAuthService.generateTokens({
        id: user.id
      })
    this.jwtAuthService.setAuthCookies(response, accessToken, refreshToken)
    response.json(user).status(HttpStatus.CREATED)
      .end()
  }

  public async login(loginData: LoginDto, response: Response): Promise<void> {
    const {
      email, password
    } = loginData
    const {
      password: userPassword, ...user
    } =
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
    const isPasswordValid = await bcrypt.compare(password, userPassword)
    if (!isPasswordValid) {
      throw new HttpException(
        ERROR_MESSAGES.PASSOWRD_WRONG,
        HttpStatus.BAD_REQUEST,
      )
    }
    const {
      accessToken, refreshToken
    } =
      await this.jwtAuthService.generateTokens({
        id: user.id,
      })
    this.jwtAuthService.setAuthCookies(response, accessToken, refreshToken)
    response.json(user).status(HttpStatus.OK)
      .end()
  }

  public async logout(id: string, response: Response): Promise<void> {
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
    this.jwtAuthService.clearAuthCookies(response)
    response
      .json({
        message: AUTH_MESSAGES.LOGOUT,
      })
      .status(HttpStatus.OK)
      .end()
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
