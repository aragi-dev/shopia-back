import { z } from "zod";

const schema = z.object({
  code: z.string(),
});

export default schema;
