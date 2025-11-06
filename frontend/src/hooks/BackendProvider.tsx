import { UserSchema, type TMedicationSchema, type TUserSchema } from "@models/schemas"
import { MedicationSchema } from "@models/schemas"
import { createContext, useContext, type ReactNode } from "react"
import { z, type ZodTypeAny } from "zod"

export type TBackendContext = {
  getPaginatedUsers: (page: number, limit: number) => Promise<TUserSchema[]>;
  getPaginatedMedications: (page: number, limit: number) => Promise<TMedicationSchema[]>;
  getFilteredPaginatedMedications: (page: number, limit: number, filter: { column: string, value: string }) => Promise<TMedicationSchema[]>;
  deleteMedicationRow: (rowId: number) => Promise<boolean>;
}

const BackendContext = createContext<TBackendContext | undefined>(undefined)

export function BackendProvider({ children }: { children?: ReactNode }) {

  async function getPaginatedUsers(page: number, limit: number): Promise<TUserSchema[]> {
    if(page < 0 || limit < 1) throw new Error('Inalid query params');
    return await getData(
      await fetch(`http://localhost:3010/admin/users/get-paginated?page=${page}&limit=${limit}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      }),
      UserSchema.array()
    );
  }

  const getPaginatedMedications = async (page: number, limit: number): Promise<TMedicationSchema[]> => {
    if(page < 0 || limit < 1) throw new Error('Inalid query params');
    return await getData(
      await fetch(`http://localhost:3010/medication/get-paginated?page=${page}&limit=${limit}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      }),
      MedicationSchema.array()
    );
  }

  const getFilteredPaginatedMedications = async (page: number, limit: number, filter: { column: string, value: string }): Promise<TMedicationSchema[]> => {
    if( page < 0 || limit < 1) throw new Error('Inalid query params');
    filter.column = filter.column.replace(' ', '_');
    return await getData(
      await fetch(`http://localhost:3010/medication/get-filtered-paginated?page=${page}&limit=${limit}&column=${filter.column}&value=${filter.value}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      }),
      MedicationSchema.array()
    );
  }

  const deleteMedicationRow = async (rowId: number): Promise<boolean> => {
    if(!rowId) return false;
    return (await fetch(`http://localhost:3010/medication/delete?rowId=${rowId}`, {
      method: 'DELETE',
      credentials: 'include'
    })).ok
  }

  const getData = async <T extends ZodTypeAny>(response: Response, schema: T): Promise<z.infer<T>> => {
    const responseBody = await response.json();
    const medications = JSON.parse(responseBody.medications);
    const result = schema.safeParse(medications)
    
    return result.data
  }


  return (
    <BackendContext.Provider value={{
      getPaginatedUsers,
      getPaginatedMedications,
      getFilteredPaginatedMedications,
      deleteMedicationRow
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
