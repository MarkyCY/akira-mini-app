import NextAuth, { DefaultSession } from "next-auth";

declare module 'next-auth' {
  interface User extends DefaultUser {
    accessToken?: string;
  }

  interface Session extends DefaultSession {
    user?: User;
  }
}