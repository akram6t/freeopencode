import { NextAuthConfig } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { db } from '@/db/drizzle';
import * as schema from '@/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { User } from 'next-auth';

export const authOptions: NextAuthConfig = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials): Promise<User | null> {
                try {
                    if (!credentials?.email || !credentials?.password) {
                        throw new Error('Please provide both email and password');
                    }

                    const existingUser = await db.query.users.findFirst({
                        where: eq(schema.users.email, credentials?.email.toString())
                    });

                    if (!existingUser || !existingUser.password) {
                        return null;
                    }

                    const passwordMatch = bcrypt.compare(credentials?.password?.toString(), existingUser.password);

                    if (!passwordMatch) {
                        return null;
                    }

                    return {
                        id: existingUser.userId as string,
                        userId: existingUser.userId as string,
                        name: existingUser.fullName,
                        email: existingUser.email,
                        profile: existingUser.profile || null,
                        googleId: existingUser.googleId as string,
                        role: existingUser.role as string,
                        isVerified: existingUser.isVerified === 1
                    };
                } catch (error) {
                    console.error('Auth error:', error);
                    return null;
                }
            }
        })
    ],
    pages: {
        signIn: '/login'
    },
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async signIn({ account, profile }) {
            if (account?.provider === 'credentials') {
                return true;
            }

            if (account?.provider === 'google') {
                if (!profile?.email_verified) {
                    throw new Error('Email not verified');
                }

                try {
                    const existingUser = await db.query.users.findFirst({
                        where: eq(schema.users.email, profile?.email!)
                    });

                    if (!existingUser) {
                        await db.insert(schema.users).values({
                            googleId: profile.sub,
                            email: profile.email!,
                            fullName: profile.name!,
                            isVerified: 1,
                            profile: profile.picture || '',
                            role: 'user'
                        });
                        return true;
                    }

                    return true;
                } catch (err) {
                    console.error('Sign in error:', err);
                    throw new Error('Internal server error');
                }
            }

            return false;
        },

        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.sub,
                    userId: token.userId as string,
                    name: token.name,
                    email: token.email,
                    image: token.picture,
                    role: token.role as string,
                    isVerified: token.isVerified as boolean,
                    googleId: token.googleId as string
                }
            };
        },

        async jwt({ token, user }) {
            if (user) {
                token.userId = user.userId
                token.picture = user.profile
                token.name = user.name
                token.role = user.role;
                token.isVerified = user.isVerified;
                token.googleId = user.googleId;
            }

            return token;
        }
    }
};