import { Account, NextAuthOptions, TokenSet } from "next-auth";
import { JWT } from "next-auth/jwt";
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import redis from "@/lib/redis";

// Here you define the type for the token object that includes accessToken.
interface ExtendedToken extends TokenSet {
  accessToken?: string;
  userId?: string;
}

export const ONE_DAY = 3600 * 24



// const clientId = "Ov23liQ0IyW871lhGzJ8";
// const clientSecret = "cc7e4cdfdb5b30552232f920c2a5aed6cc8ea9c2"

const clientId = `${process.env.GITHUB_ID}`
const clientSecret = `${process.env.GITHUB_SECRET}`

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
        // 存储访问令牌
        // Store the access token
        await storeAccessToken(account.access_token || '', token.sub);

        if (token.sub){
          // 登录送5次机会
          const key = getInterviewerUidOrderKey({ userId: token.sub })
          const orderRedisRes = await redis.get(key)
          await redis.incrby(key, 5)
        }


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
      // @ts-ignore
      session.accessToken = token.accessToken
      if (session.user){
        // @ts-ignore
          session.user.userId=token.sub


      }
      return session
    }
  },
}

async function storeAccessToken(accessToken: string, sub?: string) {
  if (!accessToken || !sub) return;
  const expire = ONE_DAY * 30; // The number of seconds in 30 days
  await redis.set(accessToken, sub, { ex: expire });
}


export const getInterviewerUidOrderKey = ({ userId }: { userId: string }) => {
  return `uid:${userId}:interviewer`
  // return `interviewer:${identifier}`
}
