import { User } from "@models";
import { UserDal } from "@dals";
import { compare, compareSync } from "bcrypt";
import type { Result } from "@utils/types";
import type { TRefreshToken, TSignupInfo } from "@auth/schemas";

class AuthService {
  private readonly dal: UserDal = new UserDal();

  constructor() {
    return this;
  }

  async signup(user: TSignupInfo): Promise<Result<User>> {
    const storeResult = await this.dal.store(user);  
    if(storeResult.success) {
      return storeResult
    } else {
      return {
        success: false,
        error: 'Email is not unique.'
      }
    }
  }

  async login({ email, password }: { email: string, password: string }): Promise<Result<User>> {
    const user = await this.dal.find({
      col: 'email',
      value: email,
      include: {}
    });
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
    const user = await this.dal.find({
      col: 'email',
      value: email,
      include: {}
    })
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
