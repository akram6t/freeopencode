// @/app/(auth)/actions.ts
"use server";

import { signIn } from "@/auth";
import { db } from "@/db/drizzle";
import bcryptjs from 'bcryptjs';
import * as schema from '@/db/schema';
import { genUniqeId } from "@/lib/helpers";
import { eq } from "drizzle-orm";
import { sendVerificationEmail } from "@/lib/resend";

export async function signupWithCredentials(data: { fullName: string, email: string; password: string }) {
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
    const setVerifyTokenExpiry = new Date(Date.now() + 60 * 60 * 1000).toISOString(); // 1 hour

    const newUser = await db.insert(schema.users).values({
      fullName: data.fullName.toString(),
      email: data.email.trim().toLowerCase(),
      password: hashedPassword,
      verifyToken: generateVerifyToken,
      verifyTokenExpiry: setVerifyTokenExpiry,
      role: defaultRole
    }).returning();

    const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL}/verify?token=${generateVerifyToken}`;
    await sendVerificationEmail(data.fullName, data.email.trim(), verificationLink);

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
  try {
    const response = await signIn('credentials', {
      email: data.email.trim().toLowerCase(),
      password: data.password.trim(),
      redirect: false,
      callbackUrl: '/',
    });

    if (response?.error) {
      // Return the error message from next-auth
      return { success: false, error: response.error };
    }

    return { success: true };
  } catch (error) {
    console.log('login with credentials: ', error);
    return { error: "An unexpected error occurred" };
  }
}


export async function loginWithGoogle() {
  // Implement Google login logic here
  // Example: Redirect to Google OAuth flow
  await signIn('google', {
    redirectTo: process.env.NEXT_PUBLIC_APP_URL!
  });
}