import { Box, Button, Flex, HStack, Image, Text } from "@chakra-ui/react"
import { signOut } from "next-auth/react"

const Avatar: React.FC<{}> = () => {
  return (
    <HStack rounded="3xl" bg="blackAlpha.700" p="2" cursor="pointer" onClick={() => window.location.href = "https://open.spotify.com/user/hosstern"}>
      <Box boxSize="14" p="1">
        <Image src="https://bit.ly/dan-abramov" rounded="full" />
      </Box>
      <Text fontWeight="bold" marginRight="1">renttrent</Text>
    </HStack>
  )
}

export const Navbar: React.FC<{}> = () => {
  return (
    <Flex position="fixed" direction="row" alignItems="center" justifyContent="space-between" width="16%" m={2} right="2">
      <Avatar />
      <Box>
        <Button 
          bg="green.700"
          _hover={{ bg: "green.500" }}
          onClick={() => signOut()}
        >
          Log Out
        </Button>
      </Box>
    </Flex>
  )
}