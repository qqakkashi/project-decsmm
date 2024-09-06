import {
  Module
} from '@nestjs/common'
import {
  AuthModule
} from './modules/auth/auth.module'
import {
  PrismaModule
} from './modules/prisma/prisma.module'
import {
  TwilioModule
} from './modules/twilio/twilio.module'
import {
  ConfigModule
} from '@nestjs/config'
import {
  UserModule
} from './modules/user/user.module'
import {
  UploadModule
} from './modules/upload/upload.module'
import {
  MulterConfigModule
} from './modules/multer/multer.module'
import {
  AdvertisementModule
} from './modules/advertisement/advertisement.module'

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    TwilioModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    UploadModule,
    MulterConfigModule,
    AdvertisementModule,
  ],
})
export class AppModule {}
