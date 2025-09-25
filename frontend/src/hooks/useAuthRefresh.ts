import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@security";
import fetchAuth from "security/fetchAuth";
import RefreshResponseBodySchema from "security/schemas/RefreshSchema";

const defaultUserData = {
  email: '',
  firstname: '',
  lastname: '',
  type: 'VISITOR' as const // UserTypeEnumSchema.Enum['VISITOR']
}

export default function useAuthRefresh() {
  const { setUser } = useAuth()

  return useQuery({
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
        setUser(defaultUserData)
        return { ok: false, message }
      }

      const userData = parsed.data.data;
      setUser(userData);

      return {
        ok: true,
        userData
      }
    }
  })
} 
