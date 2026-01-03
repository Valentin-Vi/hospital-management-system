import { PrismaClient } from "@prisma/client";
import { User } from "@/models/user";
import { UserRepository } from "@/repositories";
import { compare } from "bcrypt";
import type { Result } from "@/utils/types";
import type { TRefreshToken, TSignupInfo } from "@/auth/schemas";

class AuthService {
  private readonly prisma: PrismaClient;
  private readonly userRepository: UserRepository;

  constructor() {
    this.prisma = new PrismaClient();
    this.userRepository = new UserRepository(this.prisma);
  }

  async signup(user: TSignupInfo): Promise<Result<User>> {
    try {
      // Check if email already exists
      const existingUser = await this.userRepository.findByEmail(user.email);
      if (existingUser) {
        return {
          success: false,
          error: 'Email is not unique.'
        };
      }

      const createdUser = await this.userRepository.create({
        email: user.email,
        password: user.password,
        firstname: user.firstname,
        lastname: user.lastname,
      });

      return {
        success: true,
        data: createdUser
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to create user.'
      };
    }
  }

  async login({ email, password }: { email: string, password: string }): Promise<Result<User>> {
    const user = await this.userRepository.findByEmail(email);
    
    if (user === null) {
      return {
        success: false,
        error: 'Email not found.'
      };
    }

    if (!await compare(password, user.password)) {
      return {
        success: false,
        error: 'Incorrect password.'
      };
    }

    return {
      success: true,
      data: user
    };
  }

  async refresh(refreshToken: TRefreshToken): Promise<Result<User>> {
    const { userId, email, password } = refreshToken;
    const user = await this.userRepository.findByEmail(email);

    if (user === null) {
      return {
        success: false,
        error: 'Email not found.'
      };
    }

    if (password !== user.password) {
      return {
        success: false,
        error: 'Incorrect password.'
      };
    }

    if (userId !== user.userId) {
      return {
        success: false,
        error: 'Incorrect userId'
      };
    }

    return {
      success: true,
      data: user
    };
  }
}

export default AuthService;
