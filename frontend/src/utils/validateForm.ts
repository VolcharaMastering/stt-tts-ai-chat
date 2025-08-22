import { z } from "zod";

export const formSchema = z
    .object({
        userRequest: z
            .string()
            .min(3, "Request must be at least 3 characters long")
            .max(1000, "Request must be at most 1000 characters long")
            .optional()
            .or(z.literal("")), // empty string is also valid

        userName: z
            .string()
            .min(3, "Name must be at least 3 characters long")
            .max(20, "Name must be at most 20 characters long"),

        audioRequest: z.instanceof(Blob).optional(),
    })
    .superRefine((data, ctx) => {
        if ((!data.userRequest || data.userRequest.trim() === "") && !data.audioRequest) {
            ctx.addIssue({
                code: "custom",
                message: "You must provide either a text request or an audio request",
                path: ["userRequest"], // hook into the userRequest field
            });
        }
    });
