import { UserSchema, type TUserSchema } from "@models/schemas"
import type Medication from "models/Medication"
import { createContext, useContext, type ReactNode } from "react"
import z from "zod"

export type TBackendContext = {
  getPaginatedUsers: (page: number, limit: number) => Promise<TUserSchema[]>
}

const BackendContext = createContext<TBackendContext | undefined>(undefined)

export function BackendProvider({ children }: { children?: ReactNode }) {

  async function getPaginatedUsers(page: number, limit: number): Promise<TUserSchema[]> {
    if(page < 0 || limit < 1) throw new Error('Inalid query params');
    const response = await fetch(`http://localhost:3010/admin/users/get-paginated?page=${page}&limit=${limit}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const responseBody = await response.json();
    const users = JSON.parse(responseBody.users);
    const result = UserSchema.array().safeParse([users])

    return result.data ?? []
  }

  return (
    <BackendContext.Provider value={{
      getPaginatedUsers
    }}>
    { children }
    </BackendContext.Provider>
  )
}

export default function useBackend() {
  const context = useContext(BackendContext);
  if(context === undefined) {
    throw new Error('\"useBackend\" hook must be used within an \"BackendProvider\" component.')
  }
  return context
}
