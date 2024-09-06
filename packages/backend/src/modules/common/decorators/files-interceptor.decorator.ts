import {
  applyDecorators, UseInterceptors
} from '@nestjs/common'
import {
  FilesInterceptor,
} from '@nestjs/platform-express'
import {
  MulterError
} from 'multer'
import {
  FILE_TYPE_REGEX
} from '../consts/regex.const'

export function AdvertisementFilesInterceptor() {
  return applyDecorators(
    UseInterceptors(FilesInterceptor('files', 5, {
      fileFilter: (_, file, cb) => {
        if (file.originalname.match(FILE_TYPE_REGEX)) {
          cb(null, true)
        } else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'files'), false)
        }
      },
      limits: {
        fileSize: 1000000,
      },
    })),
  )
}