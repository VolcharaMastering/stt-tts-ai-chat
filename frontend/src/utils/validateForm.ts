import { z } from "zod";

export const formSchema = z.object({
    userRequest: z
        .string()
        .min(3, "Request must be at least 3 characters long")
        .max(1000, "Request must be at most 100 characters long"),
    username: z
        .string()
        .min(3, "Name must be at least 2 characters long")
        .max(20, "Name must be at most 20 characters long"),
});
