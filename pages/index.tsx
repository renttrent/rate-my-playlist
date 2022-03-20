import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Box, Flex, Text, VStack, Image } from '@chakra-ui/react'
import { getProviders, SessionProviderProps, useSession } from "next-auth/react"
import useSpotify from '../hooks/useSpotify'
import { Navbar } from '../components/Navbar'
import { Playlist } from '../types/general'
import Router from 'next/router'

const Home: NextPage<{providers: SessionProviderProps}> = ({providers}) => {
  const {data: session, status } = useSession()
 
  const user = session?.user
  const [playlists, setPlaylists] = useState([])
  const spotifyApi = useSpotify()

  useEffect(() => {
    if(status === "unauthenticated") {
      Router.push("/welcome")
    }

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
      {/* @ts-ignore */}
      <Navbar user={user} />
      <Flex direction="column" p="2" width="50%" margin="auto">
        {playlists.map((playlist: Playlist) => (
          <Box
            p="2"
            boxShadow="lg"
            bg="gray.900"
            _hover={{ bg: "green.900"}}
            m="2"
            key={playlist.id}
          >
            {/* @ts-ignore */}
            <Image src={playlist.images[0].url} boxSize="28" objectFit="cover"/>
            <Text>{playlist.name}</Text>
            <Text>{playlist.description.replace(new RegExp("&"+"#"+"x27;", "g"), "'")}</Text>
          </Box>
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
      providers
    }
  }
}