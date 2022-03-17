import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'
import { getProviders, SessionProviderProps, useSession } from "next-auth/react"
import useSpotify from '../hooks/useSpotify'
import { Navbar } from '../components/Navbar'

interface User {
  accessToken: string,
  email: string,
  image: string,
  name: string,
  refreshToken: string,
  username: string
}

const Home: NextPage<{providers: SessionProviderProps}> = ({providers}) => {
  const {data: session, status } = useSession()
  const user = session?.user
  const [playlists, setPlaylists] = useState([])
  const spotifyApi = useSpotify()

  useEffect(() => {
    if(spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data: any) => {
        setPlaylists(data.body.items)
      })
    }
  }, [session, spotifyApi])
  
  
  return (
    <div>
      <Head>
        <title>Rate My Playlist</title>
      </Head>
      <Navbar />
      <Flex direction="column">
        <Text>{user?.name}</Text>
        {user?.image && 
        <Box>
          <Image src={user.image} alt="profilepic" width="200px" height="200px"/>
        </Box>
        }
      </Flex>
    </div>
  )
}

export default Home

export async function getServerSideProps() {
  const providers = await getProviders()
  
  return {
    props: {
      providers
    }
  }
}