import { z } from "zod";
import { ErrBrandNameToShort } from "./errors";

export const BrandCreateSchema = z.object({
  name: z.string().min(2, ErrBrandNameToShort.message),
  image: z.string().optional(),
  description: z.string().optional(),
  tagline: z.string().optional(),
});
export type BrandCreateDTO = z.infer<typeof BrandCreateSchema>;

export const BrandUpdateDTOSchema = z.object({
  name: z.string().min(2, ErrBrandNameToShort.message).optional(),
  image: z.string().optional(),
  description: z.string().optional(),
  tagline: z.string().optional(),
});
export type BrandUpdateDTO = z.infer<typeof BrandUpdateDTOSchema>;

export type BrandCondDTO = {};
