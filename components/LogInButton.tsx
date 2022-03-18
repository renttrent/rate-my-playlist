import { Button } from "@chakra-ui/react"

export const LogInButton: React.FC<{signIn: Function, providerId: string, providerCallback: string}> = ({signIn, providerId, providerCallback}) => {
  return (
    <Button bg="green.300" _hover={{ bg: "green.500" }}
      onClick={() => signIn(providerId, { callbackUrl: providerCallback})}
    >
      Login with Spotify
    </Button>
  )
}