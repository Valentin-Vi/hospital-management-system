import type { TUserInfoSchema } from "@/security/schemas"

type TLoginResult = {
  ok: true,
  userData: TUserInfoSchema
} | {
  ok: false,
  message: string
}

type TRefreshResult = TLoginResult

export type { TLoginResult, TRefreshResult }
