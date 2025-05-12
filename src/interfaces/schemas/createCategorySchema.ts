import { z } from "zod";

const createCategorySchema = z.object({
	name: z.string().min(1),
	description: z.string().optional(),
});

export default createCategorySchema;
