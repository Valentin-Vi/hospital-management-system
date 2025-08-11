import { UserTypeEnumSchema } from "@models/schemas";
import type { TLoginParams, TSignupParams, TUserInfoSchema } from '@security/schemas'
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Result } from "utils/types";
import { LoginResponseBodySchema } from "./schemas/LoginSchema";
import type { TAuthRoutes } from "./types/TAuthRoutes";
import { LoadingPage } from "@pages";

const defaultUserInfo = {
  email: '',
  firstname: '',
  lastname: '',
  type: UserTypeEnumSchema.Enum['VISITOR']
}

export type TAuthContext = {
  user: TUserInfoSchema,
  isLoading: boolean,
  signup: (userInfo: TSignupParams) => Promise<boolean>,
  login: (userInfo: TLoginParams) => Promise<Result<null>>,
  refresh: () => Promise<Result<TUserInfoSchema>>,
  logout: () => Promise<boolean>
}

const AuthContext = createContext<TAuthContext>({} as TAuthContext);

const AUTH_URL = "http://localhost:3010/auth"

export function AuthProvider({ children }: { children?: ReactNode }) {
  const [user, setUser] = useState<TUserInfoSchema>(defaultUserInfo)
  
  const { isLoading, data: userData } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await fetch(AUTH_URL + '/refresh', {
        method: 'POST',
        credentials: 'include'
      });

      if(response.ok === false) {
        logout()
        throw new Error(`Error raised when authenticating user.`)
      }

      const { userData } = await response.json();
      return userData as TUserInfoSchema
    },
    refetchInterval: 900_000
  })

  useEffect(() => {
    if(user.type === 'VISITOR' && userData) {
      setUser(userData)
    }
  }, [ userData ])
  

  if(isLoading) {
    return <LoadingPage />
  }

  async function api(route: TAuthRoutes, options: RequestInit): Promise<Response> {
    let response = undefined;
    options.credentials = options.credentials || "include";
    options.mode = options.mode || "cors";
    options.headers = {
      ...options.headers,
      'Content-Type': 'application/json'
    }

    response = await fetch(AUTH_URL + route, options)
    if(response.status === 401) {
      response = await fetch(AUTH_URL + '/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      })
      if(response.status !== 200) {
        response = await fetch(AUTH_URL + route, options);
      } else {
        throw new Error('Session expired.')
      }
    }
    return response;
  }

  async function signup(userInfo: TSignupParams): Promise<boolean> {
    const response = await api('/signup', {
      method: 'POST',
      body: JSON.stringify({
        email: userInfo.email,
        password: userInfo.password,
        firstname: userInfo.firstname,
        lastname: userInfo.lastname
      })
    })
    return response.ok
  }

  async function login(userInfo: TLoginParams): Promise<Result<null>> {
    const response = await api('/login', {
      method: 'POST',
      body: JSON.stringify({
        email: userInfo.email,
        password: userInfo.password
      })
    })

    const parseResult = LoginResponseBodySchema.safeParse(await response.json());

    if(parseResult.success === false) {
      return {
        success: false,
        error: parseResult.error.message
      };
    }

    setUser(parseResult.data.userData)

    return {
      success: true,
      data: null
    }

  }

  async function refresh(): Promise<Result<TUserInfoSchema>> {
    const response = await api('/refresh', {
      method: 'POST'
    })
    if(response.ok) {
      const responseBody = await response.json();

      return {
        success: true,
        data: responseBody.userData
      }
    }
    return {
      success: false,
      error: response.status.toString()
    }
  }

  async function logout(): Promise<boolean> {
    const response = await api('/logout', {
      method: 'POST'
    })
    return response.ok
  }

  if(isLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      signup,
      login,
      refresh,
      logout
    }}>
      { children }
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  const context = useContext(AuthContext);
  if(context === undefined) {
    throw new Error('\"useAuth\" hook must be used within an \"AuthProvider\" component.')
  }
  return context
}
