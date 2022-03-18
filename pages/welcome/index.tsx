import { Box } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { getProviders, SessionProviderProps, signIn, useSession } from "next-auth/react";
import Router from "next/router";
import { useEffect } from "react";
import { LogInButton } from "../../components/LogInButton";

const Welcome: NextPage<{providers: SessionProviderProps}> = ({providers}) => {
  const { data: session } = useSession()
  const spotifyprovider = Object.values(providers).at(0)
  useEffect(() => {
    if(session) {
      Router.push("/")
    }
  }, [session])

  return (
    <>
      <Box>Welcome</Box>
      <LogInButton  signIn={signIn} providerId={spotifyprovider.id} providerCallback={spotifyprovider.callbackUrl}/>
    </>
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