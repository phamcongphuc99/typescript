import { z } from "zod";
import { ModelStatus } from "../../../share/model/base-model";

// export enum CategoryStatus {
//   Active = "active",
//   Inactive = "inactive",
//   Deleted = "deleted",
// }

// business object / model/ entity
export const categorySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3, "name must be at least 3 characters"),
  image: z.string().optional(),
  description: z.string().optional(),
  position: z.number().min(0, "invalid position").default(0),
  parentId: z.string().uuid().nullable().optional(),
  status: z.nativeEnum(ModelStatus),
  createAt: z.date(),
  updateAt: z.date(),
});
export type Category = z.infer<typeof categorySchema> & {
  children?: Category[];
};
