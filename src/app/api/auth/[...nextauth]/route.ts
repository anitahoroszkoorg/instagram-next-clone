import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";

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
        const response = await prisma.instagram_user.findUniqueOrThrow({
          where: {
            email: credentials?.email,
          },
        });
        const passwordCorrect = await compare(
          credentials?.password || "",
          response?.password_hash,
        );
        if (passwordCorrect) {
          return {
            username: response.username,
            email: response.email,
          };
        }
        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
