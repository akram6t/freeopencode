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

export const createUserSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  profile: z.string().url("Invalid URL").nullable().optional(),
  role: z.enum(["user", "admin"]),
  password: z.string().min(6, "Password must be at least 6 characters").optional(),
})

export const createProjectSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  status: z.enum(["draft", "published"]),
  sourceUrl: z.string().url().optional(),
  demoUrl: z.string().url().optional(),
  thumbnail: z.string().url("Please enter a valid URL"),
  screenshots: z.array(z.string()).optional(),
  platforms: z.array(z.string()).min(1, "Select at least one platform"),
  languages: z.array(z.string()).min(1, "Select at least one language"),
  technologies: z.array(z.string()).min(1, "Select at least one technology"),
  technologyTypes: z.array(z.string()).min(1, "Select at least one technology type"),
  tags: z.array(z.string()).optional(),
  complexity: z.enum(["beginner", "intermediate", "advanced"]),
  metadata: z.string().optional()
});