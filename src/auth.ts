import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials"
import { login } from '@/contexts/ServerActions';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: 'Credenciales',
      credentials: {
        userid: { type: "number" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const token = await login(Number(credentials.userid));

        if (token.success === false) {
          throw new Error('Invalid credentials')
        } else {
          return { id: credentials.userid as string, accessToken: token };
        }
      }
    })
  ],
  skipCSRFCheck: true as any,
  pages: {
    signIn: "/login",
  },
  callbacks: {

    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any).accessToken;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = session.user || {};
      (session.user as any).accessToken = token.accessToken;
      session.user.id = token.id as string;
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
    // maxAge: 60,

  },
  trustHost: true,
});
