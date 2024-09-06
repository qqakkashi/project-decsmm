import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'
import {
  Request, Response
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

@Injectable()
export class JWTAuthGuard implements CanActivate {
  constructor(private readonly jwtAuthService: JWTAuthService) {}

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest()
    const response: Response = context.switchToHttp().getResponse()
    const token = request.cookies[TOKEN_TYPES.JWT] ?? null
    if (!token) {
      throw new HttpException(
        ERROR_MESSAGES.UNAUTHORIZED,
        HttpStatus.UNAUTHORIZED,
      )
    }

    try {
      const isValid = await this.validateRequest(request, response)
      return isValid
    } catch (e) {
      throw new HttpException(
        ERROR_MESSAGES.UNAUTHORIZED,
        HttpStatus.UNAUTHORIZED,
      )
    }
  }

  public async validateRequest(
    request: Request,
    response: Response,
  ): Promise<boolean> {
    const token: string | undefined = request.cookies[TOKEN_TYPES.JWT]

    if (!token) {
      return false
    }
    try {
      const user: TokenPayloadDto = this.jwtAuthService.verifyToken(token)
      if (user) {
        request.user = user

        return true
      }
    } catch {
      const refreshToken: string | undefined =
        request.cookies[TOKEN_TYPES.JWT_REFRESH]
      if (!refreshToken) {
        return false
      }

      try {
        const user: TokenPayloadDto =
          this.jwtAuthService.verifyToken(refreshToken)
        if (user) {
          const tokens = await this.jwtAuthService.generateTokens(user)

          request.user = user

          this.jwtAuthService.setAuthCookies(
            response,
            tokens.accessToken,
            tokens.refreshToken,
          )

          return true
        }
      } catch (err) {
        return false
      }
    }

    return false
  }
}
