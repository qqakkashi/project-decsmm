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
  CurrentUser,
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

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(
    @Body() body: RegisterDto,
    @Res() response: Response,
  ): Promise<void> {
    return this.authService.register(
      body,
      response
    )
  }

  @Post('login')
  public async login(
    @Body() body: LoginDto,
    @Res() response: Response,
  ): Promise<void> {
    return this.authService.login(
      body,
      response
    )
  }

  @UseGuards(JWTAuthGuard)
  @Post('logout')
  public async logout(
    @CurrentUser() user: UserFromToken,
    @Res() response: Response,
  ): Promise<boolean> {
    const {
      id
    } = user
    return this.authService.logout(id, response)
  }

  @UseGuards(JWTAuthGuard)
  @Get('me')
  public async me(@CurrentUser() user: UserFromToken): Promise<UserWithoutPassword> {
    const {
      id
    } = user
    return this.authService.me(id)
  }
}
