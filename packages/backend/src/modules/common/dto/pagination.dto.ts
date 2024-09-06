import {
  Transform
} from 'class-transformer'
import {
  IsInt, IsOptional
} from 'class-validator'

export class PaginationDto {
  @IsInt()
  @IsOptional()
  @Transform((value: any) => {
    const userValue = Number.parseInt(value.value || '1') || 1
    return userValue > 0 ?
      userValue :
      1
  })
  public page!: number

  @IsInt()
  @IsOptional()
  @Transform((value: any) => {
    const userValue = Number.parseInt(value.value || '10') || 10
    return userValue > 10 ?
      userValue :
      10
  })
  public pageSize!: number
}
