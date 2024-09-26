import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'
import {
  Request, Response,
} from 'express'
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

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest()
    const response: Response = context.switchToHttp().getResponse()
    const authHeader = request.headers['authorization']
    if (!authHeader) {
      throw new HttpException(ERROR_MESSAGES.UNAUTHORIZED, HttpStatus.UNAUTHORIZED)
    }

    const accessToken = authHeader.split(' ')[1]
    if (!accessToken) {
      throw new HttpException(ERROR_MESSAGES.UNAUTHORIZED, HttpStatus.UNAUTHORIZED)
    }

    try {
      return await this.validateAccessToken(accessToken, request)
    } catch (error) {
      return this.tryRefreshTokens(request, response)
    }
  }

  public async validateAccessToken(token:string,request: Request): Promise<boolean> {
    try {
      const payload: TokenPayloadDto = this.jwtAuthService.verifyToken(token)
      if (!payload) {
        return false
      }
      const user: UserWithoutPassword = await this.userService.getUserById(
        payload.id,
      )
      if (user.role !== UserRole.advertiser) {
        throw new HttpException(
          ERROR_MESSAGES.BLOGGER_ONLY,
          HttpStatus.FORBIDDEN,
        )
      }
      request.user = user
      return true
    } catch (error) {
      throw new HttpException(ERROR_MESSAGES.UNAUTHORIZED, HttpStatus.UNAUTHORIZED)
    }
  }

  private async tryRefreshTokens(
    request: Request,
    response: Response,
  ): Promise<boolean> {
    const refreshToken = request.headers['x-refresh-token']

    if (!refreshToken) {
      throw new HttpException(ERROR_MESSAGES.UNAUTHORIZED, HttpStatus.UNAUTHORIZED)
    }

    try {
      const payload: TokenPayloadDto = this.jwtAuthService.verifyToken(refreshToken as string)

      if (!payload) {
        throw new HttpException(ERROR_MESSAGES.UNAUTHORIZED, HttpStatus.UNAUTHORIZED)
      }
      const tokens = await this.jwtAuthService.generateTokens(payload)

      response.setHeader('authorization', `Bearer ${tokens.accessToken}`)
      response.setHeader('x-refresh-token', tokens.refreshToken)

      const user: UserWithoutPassword = await this.userService.getUserById(
        payload.id,
      )
      if (user.role !== UserRole.advertiser) {
        throw new HttpException(
          ERROR_MESSAGES.BLOGGER_ONLY,
          HttpStatus.FORBIDDEN,
        )
      }
      request.user = user
      return true
    } catch (error) {
      throw new HttpException(ERROR_MESSAGES.UNAUTHORIZED, HttpStatus.UNAUTHORIZED)
    }
  }
}
