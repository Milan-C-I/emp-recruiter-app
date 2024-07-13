import { logIn } from "@/backend";
import NextAuth, { AuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

export const authOptions:AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    Credentials({
        name: "Credentials",
        credentials: {},
        async authorize(credentials,req) {
            let {username, password} = credentials as any;
            let user = await logIn({username, password});
            if (!user) {
                return null;
            }
            return {id: user._id, ...user};
      },
    }),
  ],
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }