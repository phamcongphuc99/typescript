import { z } from "zod";

export const PagingDTOScheme = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().max(100).default(10),
  total: z.coerce.number().int().default(0).optional(),
});

export type PagingDTO = z.infer<typeof PagingDTOScheme>;
export type Cond = {};
