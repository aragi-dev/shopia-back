import { z } from "zod";

const schema = z.object({
  id: z.string().uuid(),
});

export default schema;
