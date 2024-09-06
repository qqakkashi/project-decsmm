import {
  IsEnum,
  IsNotEmpty, IsNumber, IsOptional, IsString
} from 'class-validator'
import {
  StatusEnum
} from '../const/status.enum'

export class UpdateAdvertisementDto {
    @IsOptional()
    @IsString()
    public title: string

    @IsOptional()
    @IsString()
    public description: string

    @IsOptional()
    @IsNumber()
    public transition:number

    @IsOptional()
    @IsNumber()
    public maxTransition:number

    @IsOptional()
    @IsEnum(StatusEnum)
    public status: StatusEnum
}