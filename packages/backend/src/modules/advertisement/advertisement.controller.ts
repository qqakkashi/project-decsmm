import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseGuards,
} from "@nestjs/common";
import { CreateAdvertisementDto } from "./dto/create-advertisement.dto";
import { Express } from "express";
import { AdvertisementFilesInterceptor } from "../common/decorators/files-interceptor.decorator";
import { AdvertisementService } from "./advertisement.service";
import { RoleAdvertiserGuard } from "../common/guards/role-advertiser.guard";
import { UpdateAdvertisementDto } from "./dto/update-advertisement.dto";
import { DeleteAdvertisementDto } from "./dto/delete-advertisement";

@Controller("advertisement")
export class AdvertisementController {
  constructor(private readonly advertisementService: AdvertisementService) {}

  @Post()
  @UseGuards(RoleAdvertiserGuard)
  @AdvertisementFilesInterceptor()
  public async create(
    @Body() body: CreateAdvertisementDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.advertisementService.create(body, files);
  }

  @Patch(":id")
  @UseGuards(RoleAdvertiserGuard)
  @AdvertisementFilesInterceptor()
  public async update(
    @Param("id") id: string,
    @Body() body: UpdateAdvertisementDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.advertisementService.update(id, body, files);
  }

  @Delete()
  @UseGuards(RoleAdvertiserGuard)
  public async delete(@Body() id: DeleteAdvertisementDto) {
    return this.advertisementService.delete(id);
  }
}
