import {
  HttpException, HttpStatus, Injectable
} from '@nestjs/common'
import {
  PrismaService
} from '../prisma/prisma.service'
import {
  ERROR_MESSAGES
} from '../common/consts/error.const'
import {
  UserListResult, UserWithoutPassword
} from './types/user.types'
import {
  GetUserListDto
} from './dto/get-user-list.dto'
import {
  USER_BASE_SELECT
} from './const/user.const'
import {
  ResultMetaData
} from '../common/types/pagination-metadata'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  public async getUserById(id: string): Promise<UserWithoutPassword> {
    const user = await this.prisma.user.findUnique({
      where:  {
        id
      },
      select: USER_BASE_SELECT,
    })
    if (!user) {
      throw new HttpException(
        ERROR_MESSAGES.USER_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      )
    }
    return user
  }

  public async getUserList({
    page,
    pageSize,
  }: GetUserListDto): Promise<UserListResult> {
    const usersCount = await this.prisma.user.count()
    const users = await this.prisma.user.findMany({
      skip:    (page - 1) * pageSize,
      take:    pageSize,
      orderBy: {
        name: 'asc',
      },
      select: USER_BASE_SELECT,
    })
    const metaData: ResultMetaData = {
      countOfAllPages: Math.floor(usersCount / users.length),
      isNextPage:      Math.floor(usersCount / users.length) > page,
    }

    return {
      data: users,
      metaData,
    }
  }
}
