import { userSchema } from "@schemas/User.schema";
import { z } from "zod";

export type IUserEntity = z.infer<typeof userSchema>;