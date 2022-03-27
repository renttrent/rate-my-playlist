import queryString from "query-string"

export const client_id = process.env.SPOTIFY_CLIENT
export const client_secret = process.env.SPOTIFY_SECRET
export const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN

export const redirect_uri = "http://localhost:3000/api/spotifycallback"

export const basic = Buffer.from(client_id + ':' + client_secret).toString('base64')
export const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token"

export const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: queryString.stringify({
      grant_type: 'refresh_token',
      refresh_token
    })
  });
  console.log(response.json())
  return response.json();
};

export const parseDescription = (description: string) => {
  return description.replace(new RegExp("&"+"#"+"x27;", "g"), "'")
}

export const parseRating = (rating: string): Array<number> => {
  return rating.split(',').map((nr) => parseInt(nr))
}

export const getRating = (rating: string | Array<number>) => {
  if(typeof rating === "string") {
    rating = parseRating(rating)
  }

  const allRatings = rating.map((nr, idx) => nr*idx)
  const sumRatings = allRatings.reduce((oldValue, newValue) => oldValue + newValue)
  const totalVoters = rating.reduce((oldValue, newValue) => oldValue + newValue)

  return sumRatings / totalVoters
}