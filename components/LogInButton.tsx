import { Button } from "@chakra-ui/react"

export const LogInButton: React.FC<{signIn: Function, providerId: string, providerCallback: string}> = ({signIn, providerId, providerCallback}) => {
  return (
    <Button bg="spotify.400" _hover={{ bg: "spotify.400" }}
      onClick={() => signIn(providerId, { callbackUrl: providerCallback})}
    >
      Login with Spotify
    </Button>
  )
}