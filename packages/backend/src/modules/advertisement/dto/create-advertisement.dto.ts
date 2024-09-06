import {
  IsNotEmpty, IsNumber, IsNumberString, IsString
} from 'class-validator'

export class CreateAdvertisementDto {
    @IsNotEmpty()
    @IsString()
    public title: string

    @IsNotEmpty()
    @IsString()
    public description: string

    @IsNotEmpty()
    @IsNumberString()
    public transition:number

    @IsNotEmpty()
    @IsNumberString()
    public maxTransition:number
}