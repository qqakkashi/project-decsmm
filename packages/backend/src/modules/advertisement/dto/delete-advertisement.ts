import {
  IsArray, IsNotEmpty
} from 'class-validator'

export class DeleteAdvertisementDto {
    @IsNotEmpty()
    @IsArray()
    public id: Array<string>
}