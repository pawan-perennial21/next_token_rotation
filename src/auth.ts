import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "./lib/axios";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        const res = await axios.post(`/auth/login`, {
          email: credentials?.email,
          password: credentials?.password,
        });

        const user = await res.data;
        console.log(
          "=============================================================>",
          { user }
        );
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, account }) => {
      console.log({ account });
      // user is only available the first time a user signs in authorized
      // console.log(
      //     `In jwt callback - Token is ${JSON.stringify(token)}`
      // );
      // // console.log(
      // //     `In jwt callback - account is ${JSON.stringify(
      // //         account

      return { ...token, ...user };
    },
    session: async ({ session, token }: any) => {
      console.log(`In session callback - Token is ${JSON.stringify(token)}`);
      // console.log(
      //     `In session callback - Session is ${JSON.stringify(
      //         session
      //     )}`
      // );
      session.user = token.data;

      return session;
    },
  },
});
