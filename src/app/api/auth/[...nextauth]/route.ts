import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { prisma } from "../../_base";

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
        const user = await prisma.user.findUniqueOrThrow({
          where: {
            email: credentials?.email,
          },
        });
        const passwordCorrect = await compare(
          credentials?.password || "",
          user?.password_hash,
        );
        if (!user.is_active) {
          throw new Error(
            JSON.stringify({
              errors: "User is not active",
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
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        return { ...token, id: user.id };
      }
      return token;
    },
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },
  },
});

export { handler as GET, handler as POST };
