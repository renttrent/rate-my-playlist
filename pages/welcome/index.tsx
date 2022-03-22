import { Box, Button, Stack } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { getProviders, SessionProviderProps, signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Router from "next/router";
import { useEffect } from "react";
import { LogInButton } from "../../components/LogInButton";
import spotifyApi from "../../lib/spotify";

const Welcome: NextPage<{providers: SessionProviderProps}> = ({providers}) => {
  const { data: session } = useSession()
  const spotifyprovider = Object.values(providers).at(0)
  useEffect(() => {
    if(session) {
      console.log(session)
      Router.push("/")
    }
  }, [session])

  return (
    <Stack margin="auto" width="lg">
      <Box>Welcome</Box>
      <Box
        boxSize="28"
      >
      <Image src="/spotify-icons-logos/icons/01_RGB/02_PNG/Spotify_Icon_RGB_Green.png" width="100%" height="100%"/>
      </Box>
      <LogInButton  signIn={signIn} providerId={spotifyprovider.id} providerCallback={spotifyprovider.callbackUrl}/>
    </Stack>
  )
}

export default Welcome

export const getServerSideProps: GetServerSideProps = async() => {
  const providers = await getProviders()
  return {
    props: {
      providers
    }
  }
}