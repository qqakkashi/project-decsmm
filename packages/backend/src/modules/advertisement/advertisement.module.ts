import {
  Module
} from '@nestjs/common'
import {
  AdvertisementController
} from './advertisement.controller'
import {
  AdvertisementService
} from './advertisement.service'
import {
  PrismaModule
} from '../prisma/prisma.module'
import {
  UploadModule
} from '../upload/upload.module'
import {
  UploadService
} from '../upload/upload.service'

import {
  CommonModule
} from '../common/common.module'
import {
  UserService
} from '../user/user.service'

@Module({
  imports:     [PrismaModule,UploadModule,CommonModule],
  controllers: [AdvertisementController],
  providers:   [AdvertisementService,UploadService,UserService]
})
export class AdvertisementModule {}
