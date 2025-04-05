import NextAuth, { DefaultSession, DefaultUser } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
    interface Session {
        user: {
            userId: string
            role: string
            isVerified: boolean
            googleId?: string
        } & DefaultSession["user"]
    }

    interface User extends DefaultUser {
        userId: string
        role: string
        isVerified: boolean
        googleId?: string
        profile?: string
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        userId: string
        role: string
        isVerified: boolean
        googleId?: string
        picture?: string
    }
}