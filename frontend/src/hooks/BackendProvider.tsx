import type { TUserSchema } from "@models/schemas"
import { createContext, useContext, type ReactNode } from "react"

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
    const users = responseBody.users ?? []
    let parsedUsers = [];
    for (const user of users) {
      parsedUsers.push(JSON.parse(user))
    }
    return parsedUsers
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
