import {
  Global, Module
} from '@nestjs/common'
import {
  JwtModule
} from '@nestjs/jwt'
import {
  JWTAuthGuard
} from './guards/jwt-auth.guard'
import {
  JWTAuthService
} from './jwt/jwt-auth.service'
import {
  ConfigModule
} from '@nestjs/config'
import {
  UserModule
} from '../user/user.module'

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret:      process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1d'
      },
    }),
    ConfigModule,
    UserModule,
  ],
  providers: [JWTAuthGuard, JWTAuthService],
  exports:   [JwtModule, JWTAuthService, JWTAuthGuard],
})
export class CommonModule {}
