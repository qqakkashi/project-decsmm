import {
  $Enums
} from '@prisma/client'
import {
  ResultMetaData
} from '../../common/types/pagination-metadata'

export interface IUser {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  password: string;
  role: $Enums.UserRole;
}

export enum UserRole {
  BLOGGER = 'blogger',
  ADVERTISER = 'advertiser',
}

export type UserFromToken = Pick<IUser, 'id'>
;export type UserWithoutPassword = Omit<IUser, 'password'>
;export type UserListResult = {
  data: Array<UserWithoutPassword>;
  metaData: ResultMetaData
};
