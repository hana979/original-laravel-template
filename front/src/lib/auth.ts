import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { loginEndpoint } from '@/app/api/config';
import { LoginResponceType } from '@/types/login';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const data = {
          email: credentials?.email,
          password: credentials?.password,
        }
        const headers = new Headers({
          "Content-Type": "application/json",
        })
        const options = {
          method: "POST",
          headers,
          body: JSON.stringify(data),
        }
        try {
          // console.log(options)
          const response = await fetch(loginEndpoint(), options)

          if (response.ok) {
            const res: LoginResponceType = await response.json()
            console.log("response", res)
            return res
          }
        } catch (error) {
          console.log("Error", error)
        }

        return null
      },
    }),
  ],
  callbacks: {
    async redirect({ baseUrl }) {
      return baseUrl
    },
    session: ({ session, token }) => {
      console.log("in session", {session, token});
        return {
          ...session,
          user: {
            ...session.user,
            accessToken: token.accessToken,
            expiresAt: token.expiresAt,
          }
        }
      },
      jwt: ({ token, user }) => {
        console.log('in jwt', {user, token})
        if (user) {
          token.user = user;
          token.accessToken = user.accessToken
          token.expiresAt = user.expiresAt
        }
        return token
      },
  },
};
