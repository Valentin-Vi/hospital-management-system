import { genSaltSync, hashSync } from "bcrypt"

export default function hashPassword(password: string): string {
  const salt = genSaltSync(10)
  return hashSync(password, salt)
}