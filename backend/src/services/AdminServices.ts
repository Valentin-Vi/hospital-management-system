
import { UserDal } from "@dals";
import { TIncludeArgs } from "@dals/schemas";
import { TGetPaginatedUsersParams } from "./types/TGetPaginatedUsersParams";

class AdminService {
  constructor(
    private readonly userDal: UserDal = new UserDal(),
    private readonly include: TIncludeArgs = {}
  ) { }

  async getPaginatedUsers({
    page,
    limit
  }: TGetPaginatedUsersParams) {
    return await this.userDal.getPaginatedUsers({ page, limit });
  }
}

export default AdminService
