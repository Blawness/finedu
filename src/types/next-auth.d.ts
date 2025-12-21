import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            email: string;
            name?: string | null;
            image?: string | null;
            totalXP: number;
            level: number;
            currentStreak: number;
        };
    }

    interface User {
        id: string;
        email: string;
        name?: string | null;
        image?: string | null;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
    }
}
