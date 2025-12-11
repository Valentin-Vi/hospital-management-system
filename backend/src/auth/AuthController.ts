import { AuthService } from "@/auth";
import { SignupInfoSchema } from "@/auth/schemas";
import { LoginInfoSchema } from "@/auth/schemas";
import type { Result } from "@/utils/types";
import { RefreshTokenSchema, type TRefreshToken } from "@/auth/schemas";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { Request, Response } from "express";
import { hashPassword } from "@/utils";

class AuthController {
  
  private readonly service: AuthService;
  readonly #ACCESS_TOKEN_SECRET: string;
  readonly #REFRESH_TOKEN_SECRET: string;
  readonly #ACCESS_TOKEN_LIFE: number;
  readonly #REFRESH_TOKEN_LIFE: number;
  
  constructor() {
    this.service = new AuthService();

    // Bind methods
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.refresh = this.refresh.bind(this);

    let accessTokenSecret: string | undefined = process.env.ACCESS_TOKEN_SECRET;
    let refreshTokenSecret: string | undefined = process.env.ACCESS_TOKEN_SECRET;
    let accessTokenLife: string | undefined = process.env.ACCESS_TOKEN_LIFE;
    let refreshTokenLife: string | undefined = process.env.REFRESH_TOKEN_LIFE;
    
    if(accessTokenSecret === undefined) {
      throw new Error('ACCESS_TOKEN_SECRET value not defined in `.env` file.')
    }

    if(refreshTokenSecret === undefined) {
      throw new Error('REFRESH_TOKEN_SECRET value not defined in `.env` file.')
    }
    
    this.#ACCESS_TOKEN_SECRET = accessTokenSecret;
    this.#REFRESH_TOKEN_SECRET = refreshTokenSecret;
    
    if(accessTokenLife === undefined) {
      throw new Error('ACCESS_TOKEN_LIFE numerical value not defined in .env file.');
    }

    if(refreshTokenLife === undefined) {
      throw new Error('REFRESH_TOKEN_LIFE numerical value not defined in .env file.');
    }

    this.#ACCESS_TOKEN_LIFE = parseInt(accessTokenLife);
    this.#REFRESH_TOKEN_LIFE = parseInt(refreshTokenLife);

    return this;
  }

  async signup(request: Request, response: Response): Promise<Response> {
    try {
      const signupInfo: any = request.body;
      const parseResult = SignupInfoSchema.safeParse(signupInfo)
      if(parseResult.success === false) {
        return response.status(400).json({
          message: 'signupInfo is malformed or not present.',
          error: parseResult.error
        });
      }
      const userInfo = parseResult.data
      userInfo.password = hashPassword(userInfo.password)
      const signedUser = await this.service.signup(
        userInfo
      );

      if(signedUser.success) {
        return response.status(200).json({
          message: 'Signup successful.'
        });
      } else {
        return response.status(400).json({
          message: 'Email already exists.'
        });
      }

    } catch(err) {
      console.error(err);
      return response.status(500).json({
        message: 'Internal server error.'
      });
    };
  }

  async login(request: Request, response: Response): Promise<Response> {
    try {
      const loginInfo = request.body;

      const parseResult = LoginInfoSchema.safeParse(loginInfo);
      if(parseResult.success === false) {
        return response.status(400).json({
          message: 'loginInfo is malformed or not present.'
        });
      }

      const loginResult = await this.service.login(parseResult.data)
      if (loginResult.success === false) return response.status(401).json({
        message: loginResult.error
      });
      
      const user = loginResult.data;
      const accessToken = this.#generateAccessTokens(user.userId)
      const refreshToken = this.#generateRefreshToken({
        userId: user.userId,
        email: user.email,
        password: user.password
      })

      response.cookie(
        'accessToken',
        accessToken,
        {
          httpOnly: true,
          sameSite: 'none',
          secure: true,
          maxAge: this.#ACCESS_TOKEN_LIFE
        }
      )

      response.cookie(
        'refreshToken',
        refreshToken,
        {
          httpOnly: true,
          sameSite: 'none',
          secure: true,
          maxAge: this.#REFRESH_TOKEN_LIFE
        }
      )

      return response.status(200).json({
        message: 'LogIn successful.',
        data: {
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          type: user.type          
        }
      });
    } catch(err) {
      console.error(err);
      return response.status(500).json({
        message: 'Internal server error.'
      });
    }
  }

  async refresh(request: Request, response: Response): Promise<Response> {
    try {
      const refreshToken = request.cookies.refreshToken;
      const verifyResult = this.#verifyCookie(refreshToken)

      if(refreshToken === undefined) {
        return response.status(400).json({
          message: 'refreshToken not provided'
        })
      }

      if(verifyResult.success === false) {
        this.#clearAuthCookies(response)
        return response.status(401).json({
          message: verifyResult.error
        })
      }

      const refreshResult = await this.service.refresh(verifyResult.data)
      if (refreshResult.success === false) {
        this.#clearAuthCookies(response);
        return response.status(400).json({
          message: refreshResult.error
        });
      }

      const user = refreshResult.data
      const accessToken = this.#generateAccessTokens(user.userId)
      
      response.cookie(
        'accessToken',
        accessToken,
        {
          httpOnly: true,
          sameSite: 'none',
          secure: true,
          maxAge: this.#ACCESS_TOKEN_LIFE
        }
      )

      return response.status(200).json({
        message: "accessToken cookie refreshed successfully.",
        data: {
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          type: user.type
        }
      })
    } catch(err) {
      console.error(err);
      return response.status(500).json({
        message: 'Internal server error.'
      });
    }
  }

  async logout(request: Request, response: Response): Promise<Response> {
    try {
      this.#clearAuthCookies(response)
      return response.status(200).json({
        message: "Logged out Successfully."
      })
    } catch(err) {
      console.error(err)
      return response.status(500).json({
        message: "Internal server error."
      })
    }
  }

  #verifyCookie(refreshToken: any): Result<TRefreshToken> {
    try {
      const decoded = jwt.verify(refreshToken, this.#REFRESH_TOKEN_SECRET);
      
      if('string' === typeof decoded) {
        return {
          success: false,
          error: 'refreshToken value is not of type TRefreshToken.'
        }
      }
      
      RefreshTokenSchema.parse(decoded.userInfo);
      
      return {
        success: true,
        data: decoded.userInfo
      };
      
    } catch(err) {
      if(err instanceof TokenExpiredError) {
        return {
          success: false,
          error: 'TokenExpiredError: jwt expired'
        }
      } else if (err instanceof JsonWebTokenError) {
        return {
          success: false,
          error: "JsonWebTokenError: invalid signature"
        }
      } else {
        console.error(err)
        return {
          success: false,
          error: (err as Error).message
        }
      }
    }
  }

  #generateAccessTokens(userId: number): string {
    return jwt.sign(
      { userId: userId },
      this.#ACCESS_TOKEN_SECRET,
      { expiresIn: this.#ACCESS_TOKEN_LIFE }
    )
  }

  #generateRefreshToken(userInfo: TRefreshToken): string {
    return jwt.sign(
      { userInfo: userInfo },
      this.#REFRESH_TOKEN_SECRET,
      { expiresIn: this.#REFRESH_TOKEN_LIFE }
    )
  }

  #clearAuthCookies(response: Response) {
    response.cookie('refreshToken', {
      httpOnly: true,
      sameSite: 'none',
    });
    response.cookie('accessToken', {
      httpOnly: true,
      sameSite: 'none',
    });
  }
};

export default AuthController;
