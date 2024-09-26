import {
  Body,
  Controller,
  Delete, Get,
  Param,
  Patch,
  Post, Query,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common'
import {
  CreateAdvertisementDto
} from './dto/create-advertisement.dto'
import type {
  Express
} from 'express'
import {
  AdvertisementFilesInterceptor
} from '../common/decorators/files-interceptor.decorator'
import {
  AdvertisementService
} from './advertisement.service'
import {
  RoleAdvertiserGuard
} from '../common/guards/role-advertiser.guard'
import {
  UpdateAdvertisementDto
} from './dto/update-advertisement.dto'
import {
  DeleteAdvertisementDto
} from './dto/delete-advertisement'
import {
  CurrentUser
} from '../common/decorators/user.decorator'
import {
  UserFromToken
} from '../user/types/user.types'
import {
  GetAdvertisementsDto
} from './dto/get-advertisements.dto'

@Controller('advertisement')
export class AdvertisementController {
  constructor(private readonly advertisementService: AdvertisementService) {}

  @Get()
  @UseGuards(RoleAdvertiserGuard)
  public async getUserAdvertisements(
    @CurrentUser() user:UserFromToken,
    @Query() query:GetAdvertisementsDto) {
    return this.advertisementService.getUserAdvertisements(user,query)
  }

  @Post()
  @UseGuards(RoleAdvertiserGuard)
  @AdvertisementFilesInterceptor()
  public async create(
    @CurrentUser() user:UserFromToken,
    @Body() body: CreateAdvertisementDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.advertisementService.create(user,body, files)
  }

  @Patch(':id')
  @UseGuards(RoleAdvertiserGuard)
  @AdvertisementFilesInterceptor()
  public async update(
    @Param('id') id: string,
    @Body() body: UpdateAdvertisementDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.advertisementService.update(id, body, files)
  }

  @Delete()
  @UseGuards(RoleAdvertiserGuard)
  public async delete(@Body() id: DeleteAdvertisementDto) {
    return this.advertisementService.delete(id)
  }
}
