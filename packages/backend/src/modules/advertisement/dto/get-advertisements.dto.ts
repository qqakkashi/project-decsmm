import {
  IsOptional
} from 'class-validator'
import {
  $Enums
} from '.prisma/client'
import {
  PaginationDto
} from '../../common/dto/pagination.dto'

export class GetAdvertisementsDto extends PaginationDto {
  @IsOptional()
  public status?:$Enums.AdvertisementStatus
}
