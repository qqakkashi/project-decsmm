import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { JWTAuthGuard } from "../common/guards/jwt-auth.guard";
import { UserService } from "./user.service";
import { UserListResult, UserWithoutPassword } from "./types/user.types";
import { GetUserListDto } from "./dto/get-user-list.dto";

@UseGuards(JWTAuthGuard)
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(":id")
  public async getUserById(
    @Param("id") id: string,
  ): Promise<UserWithoutPassword> {
    return this.userService.getUserById(id);
  }

  @Get()
  public async getUserList(
    @Query() query: GetUserListDto,
  ): Promise<UserListResult> {
    return this.userService.getUserList(query);
  }
}
