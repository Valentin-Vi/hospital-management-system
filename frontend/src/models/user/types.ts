import type z from "zod";
import { userRoleSchema } from "./schema";

export type TUserRole = z.infer<typeof userRoleSchema>;
