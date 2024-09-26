import {
  Injectable, InternalServerErrorException
} from '@nestjs/common'
import {
  PrismaService
} from '../prisma/prisma.service'
import type {
  Express
} from 'express'
import {
  UploadService
} from '../upload/upload.service'
import {
  ADVERTISEMENT_BASE_SELECT,
} from './const/advertisement.const'
import {
  CreateAdvertisementDto
} from './dto/create-advertisement.dto'
import {
  UpdateAdvertisementDto
} from './dto/update-advertisement.dto'
import {
  DeleteAdvertisementDto
} from './dto/delete-advertisement'
import {
  UserFromToken
} from '../user/types/user.types'
import {
  GetAdvertisementsDto
} from './dto/get-advertisements.dto'
import {
  $Enums,
} from '@prisma/client'

@Injectable()
export class AdvertisementService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly uploadService: UploadService,
  ) {}

  public async create(
    currentUser:UserFromToken,
    body: CreateAdvertisementDto,
    files: Array<Express.Multer.File>,
  ) {
    try {
      const {
        id
      } = currentUser
      const {
        title, description, transition, maxTransition
      } = body
      const uploadedFileData = await this.uploadService.uploadFiles(files)
      const advertisementFilesData = uploadedFileData.map(
        ({
          url, type, path
        }) => {
          return {
            type,
            url,
            path,
          }
        },
      )
      return this.prismaService.advertisement.create({
        data: {
          title,
          description,
          transition:         Number(transition),
          maxTransition:      Number(maxTransition),
          advertisementFiles: {
            create: advertisementFilesData,
          },
          status:    $Enums.AdvertisementStatus.progress,
          creatorId: id
        },
        include: {
          advertisementFiles: true,
        },
      })
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  public async update(
    id: string,
    body: UpdateAdvertisementDto,
    files: Array<Express.Multer.File>,
  ) {
    if (files.length > 0) {
      const oldFiles: Array<string> = (
        await this.prismaService.advertisementFiles.findMany({
          where: {
            advertisementId: id,
          },
          select: {
            path: true,
          },
        })
      ).map((file) => {
        return file.path
      })
      const updatedFiles = await this.uploadService.replaceFiles(
        files,
        oldFiles,
      )
      const advertisementFilesData = updatedFiles.map(({
        url, type, path
      }) => {
        return {
          type,
          url,
          path,
        }
      })
      await this.prismaService.advertisementFiles.deleteMany({
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
        id,
      },
      data: {
        ...body,
      },
    })
  }

  public async delete(body: DeleteAdvertisementDto) {
    const filesPath = (
      await this.prismaService.advertisementFiles.findMany({
        where: {
          advertisementId: {
            in: body.id,
          },
        },
        select: {
          path: true,
        },
      })
    ).map((file) => {
      return file.path
    })
    await this.uploadService.deleteFiles(filesPath)
    return this.prismaService.advertisement.deleteMany({
      where: {
        id: {
          in: body.id,
        },
      },
    })
  }

  public async getUserAdvertisements(user: UserFromToken, query: GetAdvertisementsDto) {
    const {
      page,pageSize
    } = query
    const {
      id,
    } = user
    const advertisements = await  this.prismaService.advertisement.findMany({
      skip:    (page - 1) * pageSize,
      take:    pageSize,
      where: {
        status:    query.status,
        creatorId: id,
      },
      select: {
        ...ADVERTISEMENT_BASE_SELECT,
        advertisementFiles: {
          select: {
            url: true
          }
        }
      }
    })
    return advertisements
  }
}
