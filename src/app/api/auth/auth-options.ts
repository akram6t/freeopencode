import { NextAuthConfig } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthConfig = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                }
            }
        }),
        CredentialProvider({
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            // check is email and password.
            async authorize(credentials) {
                if (!credentials.email || !credentials.password) {
                    return null;
                }

                return {};
                // check user in db

            }
        })
    ],
    pages: {
        newUser: '/signup',
        signIn: '/login'
    },
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async signIn({ account, profile }) {
            if (account?.provider !== 'google') {
                return false;
            }

            if (!profile?.email_verified) {
                return false
            }
            try{

                
            }
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id as string
                session.user.name = token.name
                session.user.email = token.email
            }
            return session
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.name = user.name
                token.email = user.email
            }
            return token
        }
    }
}