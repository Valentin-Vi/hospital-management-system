import z from "zod";
export const IncludeArgsSchema = z.object({
    admin: z.boolean().optional(),
    client: z.boolean().optional(),
    desk: z.boolean().optional(),
    doctor: z.boolean().optional()
});
