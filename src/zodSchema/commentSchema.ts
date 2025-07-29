import type { z } from "zod/v4";
import { object, string, } from "zod/v4";


export const commentSchema = object({
  content: string().min(1),
});

export type CommentSchemaT = z.infer<typeof commentSchema>;
