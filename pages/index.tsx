import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Box, Flex, Text, VStack, Image } from '@chakra-ui/react'
import { getProviders, getSession, SessionProviderProps, useSession } from "next-auth/react"
import useSpotify from '../hooks/useSpotify'
import { Navbar } from '../components/Navbar'
import { Playlist } from '../types/general'
import Router from 'next/router'
import { PlaylistCard } from '../components/PlaylistCard'
import { createClient } from '@supabase/supabase-js'

const getUsers = async (supabaseUrl: string, supabaseKey: string, user: any) => {
  // @ts-ignore
  const supabase = createClient(supabaseUrl, supabaseKey)
  let { data: users, error } = await supabase.from("User").select(user.email)
  if (error?.message === "42703") {
    const { data, error } = await supabase.from("User").insert({ email: user.email, image: user.image, username: user.username, name: user.name })
    users = data
    console.log(error)
  }
  return { users, error }
}

const Home: NextPage<{
  providers: SessionProviderProps,
  supabaseUrl: string,
  supabaseKey: string
}> = ({
  providers,
  supabaseUrl,
  supabaseKey
}) => {
  const {data: session, status } = useSession()
 
  const user = session?.user
  const [playlists, setPlaylists] = useState([])
  const spotifyApi = useSpotify()
  useEffect(() => {
    if(user)
      getUsers(supabaseUrl, supabaseKey, user).then((data) => console.log(data.users))
    if(!session) {
      Router.push("/welcome")
    }

    if(spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data: any) => {
        setPlaylists(data.body.items)
      })
    }

    return () => (console.log("done"))
  }, [session, spotifyApi])

  return (
    <div>
      <Head>
        <title>Rate My Playlist</title>
      </Head>
      {/* @ts-ignore */}
      <Navbar user={user} />
      <Flex direction="column" p="2" width="50%" margin="auto">
        {playlists.map((playlist: Playlist) => (
          <PlaylistCard playlist={playlist} key={playlist.id}/>
        ))}
      </Flex>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps  = async () => {
  const providers = await getProviders()
  return {
    props: {
      providers,
      supabaseUrl: process.env.SUPABASE_URL || "",
      supabaseKey: process.env.SUPABASE_KEY || ""
    }
  }
}