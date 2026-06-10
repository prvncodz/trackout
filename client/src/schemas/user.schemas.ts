import * as z from "zod";

const userSignUpSchema = z.object({
    fullname: z.string("fullname is required").min(3, "fullname must be at least 3 characters").max(50, "fullname must be less than 50 characters"),
    email: z.email("invalid email format"),
    height: z.coerce
        .number()
        .min(20, "height must be at least 20 cm")
        .max(300, "height must be less than 300cm"),
    weight: z.coerce
        .number()
        .min(20, "weight must be at least 20 kg")
        .max(300, "weight must be less than 300kg"),
    password: z.string().min(3, "password must be at least 3 characters").max(20, "password must be less than 20 characters"),
});

const userSignInSchema = z.object({
    email: z.email("invalid email format"),
    password: z.string("password is required").min(3, "password must be at least 3 characters").max(20, "password must be less than 20 characters"),
});

export type UserSignUpInput = z.infer<typeof userSignUpSchema>;
export type UserSignInInput = z.infer<typeof userSignInSchema>;

export { userSignUpSchema, userSignInSchema };
