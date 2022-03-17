import { NextPage } from "next";
import { getProviders, SessionProviderProps, useSession } from "next-auth/react";
import Router from "next/router";
import { useEffect } from "react";
import { LogInButton } from "../../components/LogInButton";

const Welcome: NextPage<{providers: SessionProviderProps}> = ({providers}) => {
  const { data: session } = useSession()

  useEffect(() => {
    if(session) {
      Router.push("/")
    }
  }, [session])

  return (
    <>
      Welcome
      <LogInButton providers={providers} />
    </>
  )
}

export default Welcome

export async function getServerSideProps() {
  const providers = await getProviders()
  
  return {
    props: {
      providers
    }
  }
}