import { User } from "@/models";
import { PrismaClient } from "@prisma/client";
import { UserRepository } from "@/repositories";
import { compare } from "bcrypt";
import type { Result } from "@/utils/types";
import type { TRefreshToken, TSignupInfo } from "@/auth/schemas";

class AuthService {
  private readonly userRepo: UserRepository;

  constructor() {
    const prisma = new PrismaClient();
    this.userRepo = new UserRepository(prisma);
    return this;
  }

  async signup(user: TSignupInfo): Promise<Result<User>> {
    const result = await this.userRepo.create(user);
    if (!result.success) {
      // Check if it's a unique constraint violation (email already exists)
      if (result.error?.includes('Unique constraint') || result.error?.includes('P2002')) {
        return {
          success: false,
          error: 'Email is not unique.'
        };
      }
      return result;
    }
    return result;
  }

  async login({ email, password }: { email: string, password: string }): Promise<Result<User>> {
    const user = await this.userRepo.findByEmail(email);
    if(user === null) {
      return {
        success: false,
        error: 'Email not found.'
      }
    }

    if(!await compare(password, user.password)) {
      return {
        success: false,
        error: `Incorrect password.`
      }
    };

    return {
      success: true,
      data: user
    }
  }

  async refresh(refreshToken: TRefreshToken): Promise<Result<User>> {
    const { userId, email, password } = refreshToken;
    const user = await this.userRepo.findByEmail(email);
    if(user === null) {
      return {
        success: false,
        error: 'Email not found.'
      }
    }

    if(password !== user.password) {
      return {
        success: false,
        error: 'Incorrect password.'
      }
    }

    if(userId !== user.userId) {
      return {
        success: false,
        error: 'Incorrect userId'
      }
    }

    return {
      success: true,
      data: user
    }
  }
};


export default AuthService;
