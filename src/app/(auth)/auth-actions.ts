// @/app/(auth)/actions.ts
"use server";

import { signIn } from "@/auth";
import { db } from "@/db/drizzle";
import bcryptjs from 'bcryptjs';
import * as schema from '@/db/schema';
import { genUniqeId } from "@/lib/helpers";
import { eq } from "drizzle-orm";

export async function signupWithCredentials(data: { fullName: String, email: string; password: string }) {
  // Implement signup logic  
  try {

    const existingUser = await db.query.users.findFirst({
      where: eq(schema.users.email, data.email)
    });

    if (existingUser) {
      return { error: "User already exist!" }
    }

    // set role 'admin' when anyone signup with admin email
    const defaultRole = process.env.ADMIN_EMAIL! as string !== data.email ? 'user' : 'admin';

    const hashedPassword = await bcryptjs.hash(data.password, 10);
    const generateVerifyToken = genUniqeId(12);
    const accessVerifyTokenExpiry = new Date(Date.now() + 60 * 60 * 1000).toISOString(); // 1 hour

    const newUser = await db.insert(schema.users).values({
      fullName: data.fullName.toString(),
      email: data.email.trim().toLowerCase(),
      password: hashedPassword,
      verifyToken: generateVerifyToken,
      verifyTokenExpiry: accessVerifyTokenExpiry,
      role: defaultRole
    }).returning();

    return { success: true, data: newUser };

  } catch (err) {
    return { error: err };
  }
}

// export async function signupWithGoogle(){
//   try{
//     await signIn('google');
//     return { success: true }
//   }catch(err){
//     return { error: err }
//   }
// }

export async function createNewPassword(data: { password: string }) {
  // Implement create new password logic
}

export async function forgotPassword(data: { email: string }) {
  // Implement forgot password logic
}

export async function loginWithCredentials(data: { email: string; password: string }) {
  // Implement email/password login logic here
  await signIn('credentials', {
    email: data.email.trim().toLowerCase(),
    password: data.password.trim()
  })
}

export async function loginWithGoogle() {
  // Implement Google login logic here
  // Example: Redirect to Google OAuth flow
  await signIn('google', {
    redirectTo: process.env.NEXT_PUBLIC_APP_URL!
  });
}