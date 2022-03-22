import { Box, Flex, Image, Text } from "@chakra-ui/react"
import Link from "next/link"
import { Playlist } from "../types/general"

export const PlaylistCard: React.FC<{playlist: Playlist}> = ({ playlist }) => {
  return (
    <Link
      href={"playlist/"+playlist.id}
    >
      <Flex
        p="4"
        rounded="md"
        boxShadow="lg"
        bg="gray.900"
        _hover={{ bg: "spotify.400"}}
        m="2"
        key={playlist.id}
        cursor="pointer"
        alignItems="center"
        position="relative"
      >
        <Image src={playlist.images[0].url} boxSize="28" objectFit="cover"/>
        <Box ml="10">
        <Text fontSize="2xl" fontWeight="bold">{playlist.name}</Text>
        <Text>{playlist.description.replace(new RegExp("&"+"#"+"x27;", "g"), "'")}</Text>
        </Box>
        <Box position="absolute" right="5">
          Rating
        </Box>
      </Flex>
    </Link>
  )
} 