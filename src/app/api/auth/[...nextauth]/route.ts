import NextAuth from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        const response = await prisma.instagram_user.findUniqueOrThrow({
          where: {
            email: credentials?.email,
          },
        });
        console.log(response);
        // decode hashed password ?
        // check flagged if user is active
        console.log(response);
        const user = response.full_name;
        console.log(user);
        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
