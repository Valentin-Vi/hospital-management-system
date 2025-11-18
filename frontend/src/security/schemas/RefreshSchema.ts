import { z } from 'zod';
import { loginResponseBodySchema } from './LoginSchema';

const RefreshResponseBodySchema = loginResponseBodySchema;

export default RefreshResponseBodySchema

type TRefreshResponseBodySchema = z.infer<typeof RefreshResponseBodySchema>;

export type { TRefreshResponseBodySchema }
