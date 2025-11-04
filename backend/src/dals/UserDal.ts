import { User } from "@models";
import { PrismaClient } from "@prisma/client";
import { TUserSchema, UserSchema  } from "@models/schemas";
import type { TIncludeArgs } from "@dals/schemas";
import type { TFindParams } from "@dals/types";
import type { Result } from "@utils/types";
import type { TStoreUserSchema } from "@dals/schemas";
import { TGetPaginatedUsersParams } from "./types/TGetPaginatedUsersParams";

class UserDal {

  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient()
    return this;
  };

  async store(user: TStoreUserSchema): Promise<Result<User>> {
    try {
      const prismaUser = await this.prisma.user.create({
        data: user
      })
      return {
        success: true,
        data: new User(UserSchema.parse(prismaUser))
      };
    } catch(err) {
      console.error(err)
      if(err instanceof Error) {
        return {
          success: false,
          error: err.message
        };
      } else {
        return {
            success: false,
            error: 'idk *shrug_emoji*'
        }
      }
    }
  };
    
  async find({ col, value, include }: TFindParams): Promise<User | null> {
    switch(col) {
      case 'userId':
        return this.findId(value, include);
      case 'email':
        return this.findEmail(value, include);
      default:
        throw new Error(`Unrecognized col value: ${col}`)
    }
  }

  private async findId(userId: number, include: TIncludeArgs): Promise<User | null> {
    const prismaUser = await this.prisma.user.findUnique({
      where: { userId: userId },
      include: include
    });
    if(prismaUser === null) return null;
    const parseResult = UserSchema.parse(prismaUser);
    return new User(parseResult)
  }
  
  private async findEmail(email: string, include: TIncludeArgs): Promise<User | null> {
    const prismaUser = await this.prisma.user.findUnique({
      where: { email: email },
      include: include
    })
    if(prismaUser === null) return null;
    return new User(prismaUser)  
  }

  async getPaginatedUsers({ page, limit }: TGetPaginatedUsersParams): Promise<User[]> {
    
    const prismaUsers = await this.prisma.user.findMany({
      skip: page * limit,
      take: limit,
      orderBy: { userId: 'desc' }
    })
    return this.buildMany(prismaUsers);
  }

  private buildMany(prismaUsers: TUserSchema[]): User[] | [] {
    let users: User[] = []
    for (const entry of prismaUsers) {
      users.push(new User(entry))
    }
    return users
  }

};

export default UserDal;
