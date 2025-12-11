import { PrismaClient } from "@prisma/client";
import { UserRepository } from "@/repositories";
import { TGetPaginatedUsersParams } from "./types/TGetPaginatedUsersParams";

class AdminService {
  private userRepo: UserRepository;

  constructor() {
    const prisma = new PrismaClient();
    this.userRepo = new UserRepository(prisma);
  }

  async getPaginatedUsers({
    page,
    limit
  }: TGetPaginatedUsersParams) {
    return await this.userRepo.findPaginated(page, limit);
  }
}

export default AdminService
