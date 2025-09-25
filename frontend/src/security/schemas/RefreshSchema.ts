import { z } from 'zod';
import { LoginResponseBodySchema } from './LoginSchema';

const RefreshResponseBodySchema = LoginResponseBodySchema;

export default RefreshResponseBodySchema

type TRefreshResponseBodySchema = z.infer<typeof RefreshResponseBodySchema>;

export type { TRefreshResponseBodySchema }
