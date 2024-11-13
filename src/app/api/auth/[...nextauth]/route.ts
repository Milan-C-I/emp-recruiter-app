import { logIn } from "@/backend";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { username, password } = credentials as any;
        const user = await logIn({ username, password });
        if (!user) {
          return null;
        }
        return { id: user._id, ...user };
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
