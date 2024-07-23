import { z } from "zod";

export const formSchema = z.object({
  teacher_name: z
    .string()
    .trim()
    .min(1, "Teacher Name is required")
    .max(132, { message: "Teacher Name must be less than 132 characters" }),
  teacher_code: z
    .string()
    .trim()
    .min(1, "Teacher Code is required")
    .max(8, { message: "Teacher Code is max 8 digit" }),
});
