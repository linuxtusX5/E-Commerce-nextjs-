// NextAuth config
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        // validate user here
        // return user;
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
};
