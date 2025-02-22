import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      accessToken: string;
      refreshToken: string;
      email: string;
      role: string;
      firstName: string;
      lastName: string;
      status: string;
      userId: string;
    };
  }
}
