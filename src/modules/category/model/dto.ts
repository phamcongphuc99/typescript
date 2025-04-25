import { z } from "zod";
import { ModelStatus } from "../../../share/model/base-model";
// import { CategoryStatus } from "./model";

// schema for create category
export const categoryCreateSchema = z.object({
  name: z.string().min(3, "name must be at least 3 characters"),
  image: z.string().optional(),
  description: z.string().optional(),
  parentId: z.string().uuid().nullable().optional(),
});
export type CategoryCreateDTO = z.infer<typeof categoryCreateSchema>;

// data transfer object
export const categoryUpdateSchema = z.object({
  name: z.string().min(3, "name must be at least 3 characters").optional(),
  image: z.string().optional(),
  description: z.string().optional(),
  status: z.nativeEnum(ModelStatus).optional(),
  parentId: z.string().uuid().nullable().optional(),
});
export type CategoryUpdateDTO = z.infer<typeof categoryUpdateSchema>;

export const CategoryCondDTOSchema = z.object({
  name: z.string().min(2, "name must be at least 2 characters").optional(),
  parentId: z.string().uuid().optional(),
  status: z.nativeEnum(ModelStatus).optional(),
});
export type CategoryCondDTO = z.infer<typeof CategoryCondDTOSchema>;
