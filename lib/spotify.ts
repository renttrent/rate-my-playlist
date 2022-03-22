//@ts-ignore
import SpotifyWebApi from "spotify-web-api-node"
import { Playlist } from "../types/general"
import { client_id, client_secret } from "./useful"


const scopes = [
  "user-read-email",
  "playlist-read-private",
  "playlist-read-collaborative",
  "streaming",
  "user-read-private",
  "user-library-read",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-follow-read"
].join(",")

const params = {
  scope: scopes
}

const queryParamString = new URLSearchParams(params)

export const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`

const spotifyApi = new SpotifyWebApi({
  clientId: client_id,
  clientSecret: client_secret
})

export default spotifyApi