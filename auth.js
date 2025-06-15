import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { updateUserDetails } from "./lib/actions"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      // Initial sign in
      if (account && user) {
        console.log('Access Token:', account.access_token)
        console.log('Refresh Token:', account.refresh_token)
        
        // Update user details in database
        await updateUserDetails({
          email: user.email,
          name: user.name,
          image: user.image,
          accessToken: account.access_token,
          refreshToken: account.refresh_token
        })

        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
        }
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      session.refreshToken = token.refreshToken
      return session
    }
  }
})