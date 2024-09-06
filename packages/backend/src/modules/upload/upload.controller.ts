import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors
} from '@nestjs/common'
import {
  AnyFilesInterceptor, FileInterceptor,
  FilesInterceptor
} from '@nestjs/platform-express'
import {
  UploadService
} from './upload.service'
import {
  Express
} from 'express'
import {
  multerConfig
} from '../../configs/multer.config'

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('')
  @UseInterceptors(FilesInterceptor('files',10))
  public async uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    return this.uploadService.uploadFiles(files)
  }
}