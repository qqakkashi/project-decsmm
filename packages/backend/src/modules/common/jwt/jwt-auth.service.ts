import {
  JwtService
} from '@nestjs/jwt'
import {
  TokenPayloadDto
} from './dtos/token-payload.dto'
import {
  TOKEN_TYPES
} from '../consts/token.const'
import {
  Response
} from 'express'
import {
  COOKIE_OPTIONS
} from '../consts/cookie.const'
import {
  TokenDto
} from './dtos/token.dto'
import {
  Injectable
} from '@nestjs/common'
import {
  VerifyReturn
} from './types/verfiy.types'
import {
  ConfigService
} from '@nestjs/config'

@Injectable()
export class JWTAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async generateAccessToken(
    payload: TokenPayloadDto,
  ): Promise<TokenDto | null> {
    try {
      const accessToken = this.jwtService.sign(payload, {
        privateKey: this.configService.get('JWT_SECRET'),
        expiresIn:  '1h',
      })

      return {
        token: accessToken
      }
    } catch (e) {
      throw new Error(e.message)
    }
  }

  public async generateRefreshToken(
    payload: TokenPayloadDto,
  ): Promise<TokenDto | null> {
    try {
      const refreshToken = this.jwtService.sign(payload, {
        privateKey: this.configService.get('JWT_SECRET'),
        expiresIn:  '14d',
      })

      return {
        token: refreshToken
      }
    } catch (e) {
      throw new Error(e.message)
    }
  }

  public async generateTokens(payload: TokenPayloadDto) {
    const {
      token: refreshToken
    } = await this.generateRefreshToken(payload)
    const {
      token: accessToken
    } = await this.generateAccessToken(payload)

    return {
      accessToken, refreshToken
    }
  }

  public verifyToken<T extends object>(token: string) {
    try {
      const verify = this.jwtService.verify<VerifyReturn<T>>(token)
      if (verify.exp && verify.iat) {
        delete verify.exp
        delete verify.iat
      }

      return verify
    } catch (e) {
      throw new Error(e.message)
    }
  }

  public async decodeToken(token: string) {
    try {
      return this.jwtService.decode(token)
    } catch (e) {
      throw new Error(e.message)
    }
  }

  public setAuthCookies(
    res: Response,
    token: string,
    refreshToken: string,
  ): void {
    res.cookie(TOKEN_TYPES.JWT, token, COOKIE_OPTIONS)
    res.cookie(TOKEN_TYPES.JWT_REFRESH, refreshToken, COOKIE_OPTIONS)
  }

  public clearAuthCookies(res: Response): void {
    res.clearCookie(TOKEN_TYPES.JWT, COOKIE_OPTIONS)
    res.clearCookie(TOKEN_TYPES.JWT_REFRESH, COOKIE_OPTIONS)
  }
}
