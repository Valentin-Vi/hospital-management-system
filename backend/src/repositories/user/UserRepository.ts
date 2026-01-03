import { PrismaClient } from "@prisma/client";
import { User } from "@/models/user";
import { UserSchema } from "@/models/schemas";

/**
 * Repository for User operations
 */
export class UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  /**
   * Find user by ID
   */
  async findById(id: number): Promise<User | null> {
    const result = await this.prisma.user.findUnique({
      where: { userId: id }
    });
    return result ? this._toDomain(result) : null;
  }

  /**
   * Find user by email
   */
  async findByEmail(email: string): Promise<User | null> {
    const result = await this.prisma.user.findUnique({
      where: { email }
    });
    return result ? this._toDomain(result) : null;
  }

  /**
   * Find users with pagination
   */
  async findPaginated(page: number, limit: number): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      skip: page * limit,
      take: limit,
      orderBy: { userId: 'desc' }
    });
    return users.map(user => this._toDomain(user));
  }

  /**
   * Create a new user
   */
  async create(userData: {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    type?: string;
    enabled?: boolean;
  }): Promise<User> {
    const prismaUser = await this.prisma.user.create({
      data: {
        email: userData.email,
        password: userData.password,
        firstname: userData.firstname,
        lastname: userData.lastname,
        type: userData.type as any || 'VISITOR',
        enabled: userData.enabled ?? false
      }
    });
    return this._toDomain(prismaUser);
  }

  /**
   * Update user
   */
  async update(id: number, data: Partial<User>): Promise<User> {
    const prismaUser = await this.prisma.user.update({
      where: { userId: id },
      data: {
        email: data.email,
        password: data.password,
        firstname: data.firstname,
        lastname: data.lastname,
        enabled: data.enabled,
        type: data.type as any,
      }
    });
    return this._toDomain(prismaUser);
  }

  /**
   * Delete user
   */
  async delete(id: number): Promise<void> {
    await this.prisma.user.delete({
      where: { userId: id }
    });
  }

  /**
   * Convert Prisma model to domain entity
   */
  private _toDomain(prisma: any): User {
    return new User(UserSchema.parse(prisma));
  }
}

