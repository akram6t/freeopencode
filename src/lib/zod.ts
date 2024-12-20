// @/lib/zod.ts
import { z } from 'zod';


export const signupSchema = z.object({
    fullName: z.string().min(3, "Name should be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password should be at least 6 characters long"),
    confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});