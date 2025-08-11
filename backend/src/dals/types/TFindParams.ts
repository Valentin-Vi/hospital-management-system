import { TIncludeArgs } from "../schemas/IncludeArgsSchema";

const cols = {
  userId: "userId",
  email: "email"
} as const;

type TFindParams = 
{
  col: typeof cols.userId,
  value: number,
  include: TIncludeArgs
} | {
  col: typeof cols.email,
  value: string,
  include: TIncludeArgs
};

export default TFindParams;
