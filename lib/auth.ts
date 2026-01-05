import prisma from "@/db";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn(params: any) {
      //   console.log(params);

      const user = prisma.user.findFirst();

      return true;
    },

    async jwt({ token, user }: any) {
      if (user) {
        console.log("user found is :", user);
        const dbUser = await prisma.user.upsert({
          where: {
            email: user.email,
          },
          update: {},
          create: {
            email: user.email,
            provider: "Google",
          },
        });

        token.id = dbUser.id;
      }

      return token;
    },

    async session({ session, token }: any) {
      session.user.id = token.id;

      console.log("session is : ", session);

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
