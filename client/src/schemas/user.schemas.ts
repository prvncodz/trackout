import * as z from "zod";

const userSignUpSchema = z.object({
    fullname: z.string(),
    email: z.email("invalid email format"),
    height: z.coerce
        .number()
        .min(20, "height must be at least 20 cm")
        .max(300, "height must be less than 300cm"),
    weight: z.coerce
        .number()
        .min(20, "weight must be at least 20 kg")
        .max(300, "weight must be less than 300kg"),
    password: z.string().min(3).max(20),
});

const userSignInSchema = z.object({
    email: z.email("invalid email format"),
    password: z.string().min(3).max(20),
});

export type UserSignUpInput = z.infer<typeof userSignUpSchema>;
export type UserSignInInput = z.infer<typeof userSignInSchema>;

export { userSignUpSchema, userSignInSchema };
