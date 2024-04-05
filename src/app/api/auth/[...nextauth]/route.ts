import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req): Promise<any> {
        const user = await prisma.instagram_user.findUniqueOrThrow({
          where: {
            email: credentials?.email,
          },
        });
        const passwordCorrect = await compare(
          credentials?.password || "",
          user?.password_hash,
        );
        console.log(user);
        if (!user.is_active) {
          throw new Error(
            JSON.stringify({
              errors: "USer is not active",
              status: 401,
            }),
          );
        }
        if (passwordCorrect) {
          return {
            username: user.username,
            email: user.email,
          };
        }
        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
