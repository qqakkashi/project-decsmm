import {
  Module
} from '@nestjs/common'
import {
  MulterModule
} from '@nestjs/platform-express'
import {
  multerConfig
} from '../../configs/multer.config'

@Module({
  imports: [
    MulterModule.register(multerConfig),
  ],
  exports: [MulterModule],
})
export class MulterConfigModule {}