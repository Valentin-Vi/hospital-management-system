import z from "zod";
export const IncludeArgsSchema = z.object({
    admins: z.boolean().optional(),
    clients: z.boolean().optional(),
    desks: z.boolean().optional(),
    doctors: z.boolean().optional()
});
