import {
  Injectable, InternalServerErrorException
} from '@nestjs/common'
import {
  PrismaService
} from '../prisma/prisma.service'
import {
  Express
} from 'express'
import {
  UploadService
} from '../upload/upload.service'
import {
  DEFAULT_STATUS, DEFAULT_TRANSITION, DEFAULT_TRANSITION_MAX
} from './const/advertisement.const'
import {
  CreateAdvertisementDto
} from './dto/create-advertisement.dto'
import {
  UpdateAdvertisementDto
} from './dto/update-advertisement.dto'
import * as punycode from 'node:punycode'
import {
  DeleteAdvertisementDto
} from './dto/delete-advertisement'

@Injectable()
export class AdvertisementService {
  constructor(
      private readonly prismaService: PrismaService,
      private readonly uploadService: UploadService,
  ) {
  }

  public async create(body:CreateAdvertisementDto,files:Array<Express.Multer.File>)  {
    try {
      const {
        title,description,transition,maxTransition
      } = body
      const uploadedFileData = await this.uploadService.uploadFiles(files)
      const advertisementFilesData = uploadedFileData.map(({
        url,type,path
      }) => {
        return {
          type,
          url,
          path
        }
      })
      return this.prismaService.advertisement.create({
        data: {
          title,
          description,
          transition:         Number(transition) ?? DEFAULT_TRANSITION,
          maxTransition:      Number(maxTransition) ?? DEFAULT_TRANSITION_MAX,
          advertisementFiles: {
            create: advertisementFilesData
          },
          status: DEFAULT_STATUS
        },
        include: {
          advertisementFiles: true
        }
      })
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  public  async update(id:string,body:UpdateAdvertisementDto,files: Array<Express.Multer.File>) {
    if (files.length > 0) {
      const oldFiles:Array<string> = (await this.prismaService.advertismentFiles
        .findMany({
          where: {
            advertisementId: id,
          },
          select: {
            path: true,
          },
        }))
        .map((file) => {
          return file.path
        })
      const updatedFiles = await this.uploadService.replaceFiles(files,oldFiles)
      const advertisementFilesData = updatedFiles.map(({
        url,type,path
      }) => {
        return {
          type,
          url,
          path
        }
      })
      await this.prismaService.advertismentFiles.deleteMany({
        where: {
          advertisementId: id,
        },
      })

      await this.prismaService.advertisement.update({
        where: {
          id,
        },
        data: {
          advertisementFiles: {
            create: advertisementFilesData,
          },
        },
      })
    }
    return this.prismaService.advertisement.update({
      where: {
        id
      },
      data: {
        ...body
      }
    })
  }

  public async delete(body:DeleteAdvertisementDto) {
    const filesPath = (await this.prismaService.advertismentFiles.findMany({
      where: {
        advertisementId: {
          in: body.id
        }
      },
      select: {
        path: true,
      }
    })).map((file) => {
      return file.path
    })
    await this.uploadService.deleteFiles(filesPath)
    return this.prismaService.advertisement.deleteMany({
      where: {
        id: {
          in: body.id
        }
      }
    })
  }
}

