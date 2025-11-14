import type { TLoginParams, TSignupParams, TUserInfoSchema } from '@/security/schemas'
import { createContext, useContext, useState, type ReactNode } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { LoginResponseBodySchema } from "./schemas/LoginSchema";
import fetchAuth from './fetchAuth';
import type { TLoginResult } from './types/TAuthResults';
import { z } from 'zod';
import RefreshResponseBodySchema from './schemas/RefreshSchema';

export type TAuthContext = {
  user: TUserInfoSchema | undefined,
  setUser: React.Dispatch<React.SetStateAction<TUserInfoSchema | undefined>>,
  getIsLoggedIn: () => boolean,
  login: (params: TLoginParams) => Promise<TLoginResult>,
  signup: (userInfo: TSignupParams) => Promise<{
    ok: boolean,
    message: string
  }>,
  logout: () => Promise<{
    ok: boolean,
  }>
}

const defaultUserData = {
  email: '',
  firstname: '',
  lastname: '',
  type: 'VISITOR' as const // UserTypeEnumSchema.Enum['VISITOR']
};

const AuthContext = createContext<TAuthContext>({} as TAuthContext);

export function AuthProvider({ children }: { children?: ReactNode }) {
  const queryClient = useQueryClient()
  const [user, setUser] = useState<TUserInfoSchema | undefined>(undefined)

  useQuery({
    queryKey: ['auth', 'refresh'],
    refetchInterval: 900_000,
    refetchIntervalInBackground: true,
    queryFn: async () => {
      const response = await fetchAuth('/refresh', {
        method: 'POST'
      })

      const json = await response.json();
      const parsed = RefreshResponseBodySchema.safeParse(json);

      if(!response.ok || !parsed.success) {
        const message = parsed.success ? (parsed.data.message ?? 'Refresh failed') : 'Invalid refresh schema';
        logout()
        return { ok: false, message }
      }

      const userData = parsed.data.data;
      setUser(userData);

      return { ok: true, userData }
    }
  })

  async function login(params: TLoginParams): Promise<TLoginResult> {
    const response = await fetchAuth('/login', {
      method: 'POST',
      body: JSON.stringify(params)
    });

    const json = await response.json();
    const parsed = LoginResponseBodySchema.safeParse(json);

    if(!response.ok || !parsed.success) {
      const message = parsed.success ? (parsed.data.message ?? 'Login failed') : 'Invalid log-in schema';
      return { ok: false, message }
    }

    const userData = parsed.data.data;
    setUser(userData);

    queryClient.setQueryData(['me'], userData)

    return { ok: true, userData };
  }
  
  async function signup(userInfo: TSignupParams) {
    const response = await fetchAuth('/signup', {
      method: 'POST',
      body: JSON.stringify(userInfo)
    })
    
    const json = await response.json();

    const parseResult = z.object({
      message: z.string()
    }).safeParse(json);

    return {
      ok: response.ok,
      message: parseResult.data?.message ?? 'Sign up error'
    }
  }

  async function logout() {
    const response = await fetchAuth('/logout', {
      method: 'POST'
    })

    setUser(defaultUserData)

    return {
      ok: response.ok
    }
  }

  const getIsLoggedIn = (): boolean => {
    console.log(user?.email)
    return (user?.email ? true : false);
  }

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      signup,
      login,
      logout,
      getIsLoggedIn
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
