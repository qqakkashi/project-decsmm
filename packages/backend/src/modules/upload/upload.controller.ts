import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors
} from '@nestjs/common'
import {
  FilesInterceptor
} from '@nestjs/platform-express'
import {
  UploadService
} from './upload.service'
import type {
  Express
} from 'express'

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('')
  @UseInterceptors(FilesInterceptor('files',10))
  public async uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    return this.uploadService.uploadFiles(files)
  }
}
