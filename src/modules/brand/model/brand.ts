import { z } from "zod";
import { ModelStatus } from "../../../share/model/base-model";
import { ErrBrandNameToShort } from "./errors";

export const BrandSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2, ErrBrandNameToShort.message),
  image: z.string().optional(),
  description: z.string().optional(),
  tagline: z.string().optional(),
  status: z.nativeEnum(ModelStatus),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type Brand = z.infer<typeof BrandSchema>;
