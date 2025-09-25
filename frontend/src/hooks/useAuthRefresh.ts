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

  return {}
} 
