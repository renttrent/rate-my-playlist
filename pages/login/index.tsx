import type { NextPage } from 'next'
import { Button } from '@chakra-ui/react'
import { getProviders, signIn, SessionProviderProps } from "next-auth/react"

export async function getServerSideProps() {
  const providers = await getProviders()

  return {
    props: {
      providers
    }
  }
}

const LogIn: NextPage<{providers: SessionProviderProps}> = ({ providers }) => {
  return (
    <>
      {Object.values(providers).map((provider, i) => {
        return <div key={i}>
          <Button bg="green.300" _hover={{ bg: "green.500" }}
          onClick={() => signIn(provider.id, { callbackUrl: provider.callbackUrl })}
          >Login with {provider.name}</Button>
          </div>
      })}
    </>
  )
}

export default LogIn 
