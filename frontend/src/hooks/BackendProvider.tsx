import { userSchema, type TUserSchema } from "@/models/user"
import { medicationSchema, type TMedicationSchema, type TMedicationWithInventorySchema } from "@/models/medication"
import { createContext, useContext, type ReactNode } from "react"
import { z, type ZodType } from "zod"

export type TBackendContext = {
  getPaginatedUsers: (page: number, limit: number) => Promise<TUserSchema[]>;
  getPaginatedMedications: (page: number, limit: number) => Promise<TMedicationSchema[]>;
  getFilteredPaginatedMedications: (page: number, limit: number, filter: { column: string, value: string }) => Promise<TMedicationSchema[]>;
  deleteMedicationRow: (rowId: number) => Promise<boolean>;
  getPaginatedInventory: (page: number, limit: number) => Promise<any[]>;
  deleteMedications: (rowIds: number[]) => Promise<boolean>;
  getEntireMedicationsInventory: () => Promise<TMedicationSchema[]>;
  insertMedicationRow: (medication: TMedicationWithInventorySchema) => Promise<boolean>;
}

const BackendContext = createContext<TBackendContext | undefined>(undefined)

export function BackendProvider({ children }: { children?: ReactNode }) {

  async function getEntireMedicationsInventory(): Promise<TMedicationSchema[]> {
    return await getData(
      await fetch('http://localhost:3010/medication/get-all', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      }),
      medicationSchema.array()
    );
  }

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
      userSchema.array()
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
      medicationSchema.array()
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
      medicationSchema.array()
    );
  }

  const insertMedicationRow = async (medication: TMedicationWithInventorySchema): Promise<boolean> => {
    const result = medicationSchema.safeParse(medication);
    console.log(result.error)
    if(!result.success) return false;
    return (await fetch('http://localhost:3010/medication/insert', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(medication)
    })).ok
  }

  const deleteMedicationRow = async (rowId: number): Promise<boolean> => {
    if(!rowId) return false;
    return (await fetch(`http://localhost:3010/medication/delete?rowId=${rowId}`, {
      method: 'DELETE',
      credentials: 'include'
    })).ok
  }

  const getPaginatedInventory = async (page: number, limit: number) => {
    if(page < 0 || limit < 1) throw new Error('Inalid query params');
    return await getData(
      await fetch(`http://localhost:3010/inventory/get-paginated?page=${page}&limit=${limit}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      }),
      z.any().array()
    );
  }

  const deleteMedications = async (rowIds: number[]) => {
    if(rowIds.length === 0) return false;
    return (await fetch(`http://localhost:3010/medication/delete-many?rowIds=${rowIds.join(',')}`, {
      method: 'DELETE',
      credentials: 'include'
    })).ok
  }

  const getData = async <T extends ZodType<any>>(response: Response, schema: T): Promise<z.output<T>> => {
    const responseBody = await response.json();
    const medications = JSON.parse(responseBody.medications);
    const result = schema.safeParse(medications)

    return result.data as z.output<T>;
  }


  return (
    <BackendContext.Provider value={{
      getPaginatedUsers,
      getPaginatedMedications,
      getFilteredPaginatedMedications,
      deleteMedicationRow,
      getPaginatedInventory,
      deleteMedications,
      getEntireMedicationsInventory,
      insertMedicationRow
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
