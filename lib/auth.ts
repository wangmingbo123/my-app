import { Account, NextAuthOptions, TokenSet } from "next-auth";
import { JWT } from "next-auth/jwt";
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

// Here you define the type for the token object that includes accessToken.
interface ExtendedToken extends TokenSet {
  accessToken?: string;
  userId?: string;
}




const clientId = "Ov23liQ0IyW871lhGzJ8";
const clientSecret = "cc7e4cdfdb5b30552232f920c2a5aed6cc8ea9c2"

console.log("clientId " + clientId)
console.log("clientSecret " + clientSecret)

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
    signOut: '/auth/logout',
  },
  providers: [
    GithubProvider({
      // clientId: `${process.env.GITHUB_ID}`,
      // clientSecret: `${process.env.GITHUB_SECRET}`,
      clientId: String(clientId),
      clientSecret: String(clientSecret),
      httpOptions: {
        timeout: 50000,
      },
    }),
    GoogleProvider({
      clientId: `${process.env.GOOGLE_ID}`,
      clientSecret: `${process.env.GOOGLE_SECRET}`
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      console.log("jwt start")
      console.log(token)
      console.log(account)
      console.log("jwt end")
      // 登录(account仅登录那一次有值)
      // Only on sign in (account only has a value at that time)
      if (account) {
        token.accessToken = account.access_token
      }
      token.hello="mmm"
      return token
    },
    async session({ session, token }) {
      console.log("session start")
      console.log(session)
      console.log(token)
      console.log("session end")
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken
      return session
    }
  },
}
