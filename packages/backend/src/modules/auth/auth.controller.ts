import {
  Body, Controller, Get, Post, Res, UseGuards
} from '@nestjs/common'
import {
  RegisterDto
} from './dtos/register.dto'
import {
  Response
} from 'express'
import {
  AuthService
} from './auth.service'
import {
  User
} from '../common/decorators/user.decorator'
import {
  UserFromToken, UserWithoutPassword
} from '../user/types/user.types'
import {
  JWTAuthGuard
} from '../common/guards/jwt-auth.guard'
import {
  LoginDto
} from './dtos/login.dto'
import {
  API_ROUTES
} from '../common/consts/routes.const'

@Controller(API_ROUTES.AUTH.CONTROLLER)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(API_ROUTES.AUTH.REGISTER)
  public async register(
    @Body() body: RegisterDto,
    @Res() response: Response,
  ): Promise<void> {
    const {
      name, email, phone_number, password, role
    } = body
    return this.authService.register(
      {
        name, email, phone_number, password, role
      },
      response,
    )
  }

  @Post(API_ROUTES.AUTH.LOGIN)
  public async login(
    @Body() body: LoginDto,
    @Res() response: Response,
  ): Promise<void> {
    const {
      email, password
    } = body
    return this.authService.login({
      email, password
    }, response)
  }

  @UseGuards(JWTAuthGuard)
  @Post(API_ROUTES.AUTH.LOGOUT)
  public async logout(
    @User() user: UserFromToken,
    @Res() response: Response,
  ): Promise<void> {
    const {
      id
    } = user
    return this.authService.logout(id, response)
  }

  @UseGuards(JWTAuthGuard)
  @Get(API_ROUTES.AUTH.ME)
  public async me(@User() user: UserFromToken): Promise<UserWithoutPassword> {
    const {
      id
    } = user
    return this.authService.me(id)
  }
}
