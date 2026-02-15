import { z } from "zod";

export const AddUserSchema = z.object({
    firstName: z
        .string()
        .min(3, "First name must be at least 3 characters")
        .regex(/^[A-Za-z]+$/, "First name must contain only alphabets"),

    lastName: z
        .string()
        .min(3, "Last name must be at least 3 characters")
        .regex(/^[A-Za-z]+$/, "Last name must contain only alphabets"),


    email: z
        .email("Invalid email format (e.g., example@gmail.com)"),

    gender: z
        .string()
        .refine((val) => ["male", "female", "other"].includes(val), {
            message: "Gender must be male, female, or other",
        }),


    birthDate: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, {
            message: "Birth date must be in YYYY-MM-DD format",
        }),

});

export type AddUserForm = z.infer<typeof AddUserSchema>;

export const InputDataSchema = z.object({
    searchTerm: z.object({
        id: z
            .string()
            .regex(/^\d+$/, "ID must be a numeric value"),

        firstName: z
            .string()
            .min(3, "First name must be at least 3 characters")
            .regex(/^[A-Za-z]+$/, "First name must contain only alphabets"),

        lastName: z
            .string()
            .min(3, "Last name must be at least 3 characters")
            .regex(/^[A-Za-z]+$/, "Last name must contain only alphabets"),

        email: z
            .email("Invalid email format (e.g., example@gmail.com)"),

        gender: z
            .string()
            .refine((val) => ["male", "female", "other"].includes(val), {
                message: "Gender must be male, female, or other",
            }),

        birthDate: z
            .string()
            .regex(/^\d{4}-\d{1,2}-\d{1,2}$/, {
                message: "Birth date must be in YYYY-MM-DD format",
            }),
    })
});

export type InputData = z.infer<typeof InputDataSchema>;

export const SignInSchema = z.object({
    email: z.email("Invalid email address"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
});
export type SignInForm = z.infer<typeof SignInSchema>;

export const SignUpSchema = z.object({
    name: z
        .string()
        .min(3, "First name must be at least 3 characters")
        .regex(/^[A-Za-z]+$/, "First name must contain only alphabets"),

    email: z
        .email("Invalid email format - example@gmail.com"),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
});
export type SignUpForm = z.infer<typeof SignUpSchema>;