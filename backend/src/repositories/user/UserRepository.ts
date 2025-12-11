import { PrismaClient } from "@prisma/client";
import { User } from "@/models";
import { TUserSchema, UserSchema } from "@/models/schemas";
import type { TIncludeArgs } from "@/dals/schemas";
import type { TFindParams } from "@/dals/types";
import type { Result } from "@/utils/types";
import type { TStoreUserSchema } from "@/dals/schemas";

/**
 * Repository for User entity CRUD operations
 */
export class UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  /**
   * Create a new user
   */
  async create(user: TStoreUserSchema): Promise<Result<User>> {
    try {
      const prismaUser = await this.prisma.user.create({
        data: user
      });
      return {
        success: true,
        data: new User(UserSchema.parse(prismaUser))
      };
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        return {
          success: false,
          error: err.message
        };
      } else {
        return {
          success: false,
          error: 'Unknown error occurred'
        };
      }
    }
  }

  /**
   * Find user by various criteria
   */
  async find({ col, value, include }: TFindParams): Promise<User | null> {
    switch (col) {
      case 'userId':
        return this.findById(value as number, include);
      case 'email':
        return this.findByEmail(value as string, include);
      default:
        throw new Error(`Unrecognized col value: ${col}`);
    }
  }

  /**
   * Find user by ID
   */
  async findById(userId: number, include?: TIncludeArgs): Promise<User | null> {
    const prismaUser = await this.prisma.user.findUnique({
      where: { userId },
      include: include
    });
    if (prismaUser === null) return null;
    const parseResult = UserSchema.parse(prismaUser);
    return new User(parseResult);
  }

  /**
   * Find user by email
   */
  async findByEmail(email: string, include?: TIncludeArgs): Promise<User | null> {
    const prismaUser = await this.prisma.user.findUnique({
      where: { email },
      include: include
    });
    if (prismaUser === null) return null;
    return new User(prismaUser);
  }

  /**
   * Get paginated users
   */
  async findPaginated(page: number, limit: number): Promise<User[]> {
    const prismaUsers = await this.prisma.user.findMany({
      skip: page * limit,
      take: limit,
      orderBy: { userId: 'desc' }
    });
    return this._buildMany(prismaUsers);
  }

  /**
   * Update user
   */
  async update(userId: number, data: Partial<TUserSchema>): Promise<User> {
    const prismaUser = await this.prisma.user.update({
      where: { userId },
      data
    });
    return new User(UserSchema.parse(prismaUser));
  }

  /**
   * Delete user by ID
   */
  async delete(userId: number): Promise<void> {
    await this.prisma.user.delete({
      where: { userId }
    });
  }

  /**
   * Convert Prisma users to domain entities
   */
  private _buildMany(prismaUsers: TUserSchema[]): User[] {
    return prismaUsers.map(user => new User(user));
  }
}

