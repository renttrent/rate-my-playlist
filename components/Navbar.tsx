import { Box, Button, Flex, HStack, Image, Text } from "@chakra-ui/react"
import { Session } from "next-auth"
import { signOut, useSession } from "next-auth/react"
import { SpotifySession } from "../types/general"

const Avatar: React.FC = () => {

  // @ts-ignore
  const { data: session }: { data: SpotifySession } = useSession()

  return (
    <HStack rounded="3xl" bg="blackAlpha.400" p="2" cursor="pointer" _hover={{ bg: "blackAlpha.600" }} onClick={() => window.location.href = `https://open.spotify.com/user/${session.user.username}`}>
      <Box boxSize="14" p="1">
        {/* @ts-ignore */}
        <Image src={session?.user?.image} rounded="full" />
      </Box>
      {/* @ts-ignore */}
      <Text fontWeight="bold" marginRight="1">{session?.user?.username}</Text>
    </HStack>
  )
}

export const Navbar: React.FC = () => {

  return (
    <Flex position="fixed" direction="row" alignItems="center" justifyContent="space-between" width="16%" m={4} right="2">
      <Avatar/>
      <Box>
        <Button 
          bg="green.500"
          _hover={{ bg: "spotify.400" }}
          onClick={() => signOut()}
        >
          Log Out
        </Button>
      </Box>
    </Flex>
  )
}