import {
  Injectable, InternalServerErrorException,
} from '@nestjs/common'
import {
  Express
} from 'express'
import {
  supabase
} from '../../configs/supabase.config'
import {
  BUCKET_FOLDER,
  BUCKET_NAME, BUCKET_URL
} from './const/upload.const'
import {
  ERROR_MESSAGES
} from '../common/consts/error.const'
import {
  AdvertisementFileType
} from '@prisma/client'

@Injectable()
export class UploadService {
  public async uploadFiles(files: Array<Express.Multer.File>) {
    return Promise.all(files.map(async(file) => {
      return this.uploadFileToSupabaseBucket(file)
    }))
  }

  public async replaceFiles(newFiles: Array<Express.Multer.File>,oldFilesPath:Array<string>) {
    await supabase.storage.from(BUCKET_NAME).remove(oldFilesPath)
    return this.uploadFiles(newFiles)
  }

  public async deleteFiles(filesPath:Array<string>) {
    return supabase.storage.from(BUCKET_NAME).remove(filesPath)
  }

  private async uploadFileToSupabaseBucket(file:Express.Multer.File) {
    const filePath = `${BUCKET_FOLDER}/${Date.now()}_${file.originalname.slice(-4).replace('.','')}`
    const {
      data, error
    } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file.buffer)
    if (error) {
      throw new InternalServerErrorException(ERROR_MESSAGES.UPLOAD_FILE)
    }

    return {
      type: this.getFileType(data.fullPath),url: `${BUCKET_URL}${data.fullPath}`,path: data.path
    }
  }

  private getFileType(fileName:string) {
    const fileType = fileName.slice(-4)
    switch (true) {
    case fileType.includes('docx'):
      return  AdvertisementFileType.document
    case fileType.includes('doc'):
      return AdvertisementFileType.document
    case fileType.includes('pdf'):
      return AdvertisementFileType.document
    case fileType.includes('png'):
      return AdvertisementFileType.image
    case fileType.includes('jpg'):
      return AdvertisementFileType.image
    default:
      throw new InternalServerErrorException(ERROR_MESSAGES.UPLOAD_FILE)
    }
  }
}
