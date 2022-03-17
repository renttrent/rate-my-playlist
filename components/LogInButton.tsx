import { Button } from "@chakra-ui/react"
import { SessionProviderProps, signIn } from "next-auth/react"

export const LogInButton: React.FC<{providers: SessionProviderProps}> = ({providers}) => {
  const provider = Object.values(providers).at(0)
  console.log(provider.callbackUrl)
  return (
    <Button bg="green.300" _hover={{ bg: "green.500" }}
      onClick={() => signIn(provider.id, { callbackUrl: provider.callbackUrl })}
    >
      Login with {provider.name}
    </Button>
  )
}