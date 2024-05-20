import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENTID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
