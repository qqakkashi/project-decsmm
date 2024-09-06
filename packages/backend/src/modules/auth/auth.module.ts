import {
  Module, forwardRef
} from '@nestjs/common'
import {
  AuthController
} from './auth.controller'
import {
  AuthService
} from './auth.service'
import {
  PrismaModule
} from '../prisma/prisma.module'
import {
  CommonModule
} from '../common/common.module'

@Module({
  imports:     [forwardRef(() => {
    return PrismaModule
  }), CommonModule],
  controllers: [AuthController],
  providers:   [AuthService],
})
export class AuthModule {}
