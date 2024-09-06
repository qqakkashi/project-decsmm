import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'
import {
  Request
} from 'express'
import {
  TOKEN_TYPES
} from '../consts/token.const'
import {
  ERROR_MESSAGES
} from '../consts/error.const'
import {
  JWTAuthService
} from '../jwt/jwt-auth.service'
import {
  TokenPayloadDto
} from '../jwt/dtos/token-payload.dto'
import {
  UserService
} from '../../user/user.service'
import {
  UserWithoutPassword
} from '../../user/types/user.types'
import {
  UserRole
} from '@prisma/client'

@Injectable()
export class RoleAdvertiserGuard implements CanActivate {
  constructor(
    private readonly jwtAuthService: JWTAuthService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest()
    const token = request.cookies[TOKEN_TYPES.JWT] ?? null
    if (!token) {
      throw new HttpException(
        ERROR_MESSAGES.UNAUTHORIZED,
        HttpStatus.UNAUTHORIZED,
      )
    }

    try {
      const isValid = await this.validateRequest(request)
      return isValid
    } catch (e) {
      throw new HttpException(
        ERROR_MESSAGES.UNAUTHORIZED,
        HttpStatus.UNAUTHORIZED,
      )
    }
  }

  public async validateRequest(request: Request): Promise<boolean> {
    const token: string | undefined = request.cookies[TOKEN_TYPES.JWT]

    if (!token) {
      return false
    }
    const payload: TokenPayloadDto = this.jwtAuthService.verifyToken(token)
    const user: UserWithoutPassword = await this.userService.getUserById(
      payload.id,
    )
    if (user.role !== UserRole.advertiser) {
      throw new HttpException(
        ERROR_MESSAGES.ADVERTISER_ONLY,
        HttpStatus.FORBIDDEN,
      )
    }

    return true
  }
}
