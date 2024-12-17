'use server'

import { signIn } from 'next-auth/react';

export async function authenticate(
    email: string,
    password: string
) {
    try {
        await signIn('credentials', { email, password });
        return { success: true };
    } catch (error) {
        return { success: false, error: 'Authentication failed' };
    }
}
