export interface User {
  accessToken: string,
  email: string,
  image: string,
  name: string,
  refreshToken: string,
  username: string
}

export interface SpotifySession {
  expires_at: string,
  user: User
}

export interface Playlist {
  collaborative: boolean,
  description: string,
  id: string,
  external_urls: {
    spotify: string,
  },
  href: string,
  images: Array<
    {
      height: number | null,
      url: string
    }>,
  name: string,
  owner: {
    display_name: string,
    external_urls: {
      spotify: string
    },
    href: string,
    id: string,
    type: string,
    uri: string
  },
  primary_color: string | null,
  public: boolean,
  snapshot_id: string,
  tracks: {
    href: string,
    total: number
  },
  type: string,
  uri: string
}