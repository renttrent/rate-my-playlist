import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify"
import { client_id, client_secret } from "../../../lib/useful"

const refreshAccessToken = async (token: any) => {
  try {
    spotifyApi.setAccessToken(token.accessToken)
    spotifyApi.setRefreshToken(token.refreshToken)

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken()

    console.log("Refreshed Token Is: ", refreshedToken)

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_at * 1000, // date to now plus 1 hour
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken
    }
  } catch (err) {
    console.log(err)

    return {
      ...token,
      error: "RefreshAccessTokenError"
    }
  }
}

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: client_id ? client_id : "",
      clientSecret: client_secret ? client_secret : "",
      authorization: LOGIN_URL
    }),
  ],
  secret: process.env.JWT,
  pages: {
    signIn: '/login'
  },
  callbacks: {
    //@ts-ignore
    async jwt({ token, account, user }) {
      if(account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at ? account.expires_at * 1000 : 0 // time
        }
      }
      //@ts-ignore
      if(Date.now() < token.accessTokenExpires) {
        console.log("ACCESS TOKEN VALID")
        return token
      }

      console.log("ACCESS TOKEN EXPIRED")
      return await refreshAccessToken(token)
    },
    //@ts-ignore
    async session({ session, token }) {
      //@ts-ignore
      session.user.accessToken = token.accessToken
      //@ts-ignore
      session.user.refreshToken = token.refreshToken
      //@ts-ignore
      session.user.username = token.username

      return session
    },
    async redirect({ url, baseUrl }) {
      return baseUrl + '/welcome'
    }
  }
})