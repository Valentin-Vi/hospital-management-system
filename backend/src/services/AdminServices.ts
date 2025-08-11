
import { UserDal } from "@dals";
import { TIncludeArgs } from "@dals/schemas";
import { TFindParams } from "@dals/types";
import { TUserSchema } from "@models/schemas";
import { Request, Response } from "express";
import { TGetPaginatedUsersParams } from "./types/TGetPaginatedUsersParams";
import { User } from "@models";

class AdminService {
  constructor(
    private readonly userDal: UserDal = new UserDal(),
    private readonly include: TIncludeArgs = { }
  ) { }

  async getPaginatedUsers({
    page,
    limit
  }: TGetPaginatedUsersParams) {
    return await this.userDal.getPaginatedUsers({ page, limit });
  }
}

export default AdminService
