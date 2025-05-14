import Role from "@/utilities/enums/RoleEnum";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum([Role.ADMIN, Role.SELLER]),
});

export default schema;
