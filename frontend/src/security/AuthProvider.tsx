import type { TLoginParams, TSignupParams, TUserInfoSchema } from '@security/schemas'
import { createContext, useContext, useState, type ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { LoginResponseBodySchema } from "./schemas/LoginSchema";
import fetchAuth from './fetchAuth';
import type { TLoginResult } from './types/TAuthResults';
import { z } from 'zod';

export type TAuthContext = {
  user: TUserInfoSchema | undefined,
  setUser: React.Dispatch<React.SetStateAction<TUserInfoSchema | undefined>>,
  login: (params: TLoginParams) => Promise<TLoginResult>,
  signup: (userInfo: TSignupParams) => Promise<{
    ok: boolean,
    message: string
  }>,
  logout: () => Promise<{
    ok: boolean,
  }>
}

const AuthContext = createContext<TAuthContext>({} as TAuthContext);

export function AuthProvider({ children }: { children?: ReactNode }) {
  const queryClient = useQueryClient()
  const [user, setUser] = useState<TUserInfoSchema>({
    firstname: '',
    lastname: '',
    type: 'VISITOR',
    email: ''
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
    return {
      ok: (await fetchAuth('/logout', {
        method: 'POST'
      })).ok
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      signup,
      login,
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
