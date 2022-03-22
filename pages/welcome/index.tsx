import { Box, Center, Container, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { createClient } from "@supabase/supabase-js";
import { GetServerSideProps, NextPage } from "next";
import { getProviders, SessionProviderProps, signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Router from "next/router";
import { useEffect } from "react";
import { LogInButton } from "../../components/LogInButton";



const Welcome: NextPage<{
  providers: SessionProviderProps,
}> = ({
  providers,
  
}) => {
  const { data: session } = useSession()
  const spotifyprovider = Object.values(providers).at(0)
  useEffect(() => {
    if(session) {
      Router.push("/")
    }
  }, [session])

  return (
    <Center margin="auto" width="md" height="100vh" bg="blackAlpha.700" p="4" rounded="md" >
      <Flex direction="column" alignItems="center">
        <Text fontSize="3xl" fontWeight="bold">Welcome</Text>
        <HStack>
        <Box
          boxSize="20"
        >
        <Image src="/spotify-icons-logos/icons/01_RGB/02_PNG/Spotify_Icon_RGB_Green.png" width="100%" height="100%"/>
        </Box>
        <LogInButton  signIn={signIn} providerId={spotifyprovider.id} providerCallback={spotifyprovider.callbackUrl}/>
        </HStack>
      </Flex>
    </Center>
  )
}

export default Welcome

export const getServerSideProps: GetServerSideProps = async() => {
  const providers = await getProviders()
  return {
    props: {
      providers,
    }
  }
}