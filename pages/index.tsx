import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import SpotifyWebApi from "spotify-web-api-js"
import { useEffect } from 'react'
import { Box, Button } from '@chakra-ui/react'

let spotifyApi = new SpotifyWebApi()

const Home: NextPage = () => {
  
  
  useEffect(() => {
    const result = async () => {
      const f = await fetch("https://accounts.spotify.com/api/token", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${process.env.SPOTIFY_CLIENT}:${process.env.SPOTIFY_SECRET}`
        },
        body: "grant_type=client_credentials"
      })
      return await f.json()
    }
    result().then(res => console.log(res))
    // spotifyApi.getArtistAlbums("43ZHCT0cAZBISjO8DG9PnE").then(res => console.log(res))
  }, [])
  return (
    <Button>Log In</Button>
  )
}

export default Home
