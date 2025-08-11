import { z } from 'zod';

const GetPaginatedUsersRequestBodySchema = z.object({
  page: z.number().nonnegative(),
  limit: z.number().nonnegative().min(1).max(40)
})

type TGetPaginatedUsersRequestBodySchema = z.infer<typeof GetPaginatedUsersRequestBodySchema>

export {
  GetPaginatedUsersRequestBodySchema,
  TGetPaginatedUsersRequestBodySchema
}
