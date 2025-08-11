import { z } from 'zod';
import { UserSchema } from './UserSchema';
import { VisitSchema } from './VisitSchema';

export const DoctorSchema = UserSchema.extend({
    doctorId: z.number().int(),
    specialty: z.string(),
    visits: z.array(VisitSchema).default([])
});

export type TDoctorSchema = z.infer<typeof DoctorSchema>
