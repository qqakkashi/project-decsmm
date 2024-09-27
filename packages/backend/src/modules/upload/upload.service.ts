import {
  Injectable, InternalServerErrorException
} from '@nestjs/common'
import {
  ConfigService
} from '@nestjs/config'
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3'
import {
  v4 as uuidv4
} from 'uuid'
import type {
  Express
} from 'express'
import {
  AdvertisementFileType
} from '@prisma/client'
import {
  ERROR_MESSAGES
} from '../common/consts/error.const'

@Injectable()
export class UploadService {
  private readonly client: S3Client

  private readonly bucketName = this.configService.get('S3_BUCKET_NAME')

  constructor(
    private readonly configService: ConfigService,
  ) {
    const s3_region = this.configService.get('S3_REGION')

    if (!s3_region) {
      throw new Error('S3_REGION not found in environment variables')
    }

    this.client = new S3Client({
      region:      s3_region,
      credentials: {
        accessKeyId:     this.configService.get('S3_ACCESS_KEY'),
        secretAccessKey: this.configService.get('S3_SECRET_ACCESS_KEY'),
      },
      forcePathStyle: true,
    })
  }

  public async uploadFile(file:Express.Multer.File) {
    try {
      const key = `${uuidv4()}`
      const command = new PutObjectCommand({
        Bucket:      this.bucketName,
        Key:         key,
        Body:        file.buffer,
        ContentType: file.mimetype,
        ACL:         'public-read' ,
        Metadata:    {
          originalName: file.originalname,
        },
      })

      await this.client.send(command)
      const url = await this.getFileUrl(key)
      return {
        type: this.getFileType(file.originalname),
        url,
        key,
      }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  public async uploadFiles(files:Array<Express.Multer.File>) {
    return Promise.all(files.map(
      async(file) => {
        return this.uploadFile(file)
      }))
  }

  public async getFileUrl(key: string) {
    return `https://${this.bucketName}.s3.amazonaws.com/${key}`
  }

  public async deleteFile(key: string) {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key:    key,
      })

      await this.client.send(command)

      return true
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  public async replaceFiles(files:Array<Express.Multer.File>,keys:Array<string>) {
    await this.deleteFiles(keys)
    return this.uploadFiles(files)
  }

  public async deleteFiles(keys:Array<string>) {
    await Promise.all(keys.map(async(key) => {
      await this.deleteFile(key)
    }))
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
      throw new Error(ERROR_MESSAGES.UPLOAD_FILE)
    }
  }
}
