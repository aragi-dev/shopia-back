import { z } from "zod";

const createProductSchema = z.object({
  code: z.string().min(1),
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number().positive(),
  purchase_price: z.number().positive(),
  stock: z.number().int().nonnegative(),
});

export default createProductSchema;
