import { z } from 'zod';
import { UserSchema } from '@/models/user';
import { VisitSchema } from '@/models/visit';

export const DoctorSchema = UserSchema.extend({
    doctorId: z.number().int(),
    specialty: z.string(),
    visits: z.array(VisitSchema).default([])
});

export type TDoctorSchema = z.infer<typeof DoctorSchema>
