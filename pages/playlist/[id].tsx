import { Box, Divider, HStack, Image, Skeleton, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Stack, Text, VStack } from "@chakra-ui/react";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSpotify from "../../hooks/useSpotify";
import { Playlist, User } from "../../types/general";
import { FaArrowLeft } from "react-icons/fa"
import { Navbar } from "../../components/Navbar";
import { useSession } from "next-auth/react";
const Playlist: NextPage<{}> = () => {
  const router = useRouter()
  const {data: session, status} = useSession()
  const [playlist, setPlaylist] = useState<Playlist | undefined>(undefined)
  const [owner, setOwner] = useState<User | undefined>(undefined)
  const spotifyApi = useSpotify()
  useEffect(() => {
    spotifyApi.getPlaylist(router.query.id).then((res: any) => setPlaylist(res.body))
    if(playlist) {
      spotifyApi.getUser(playlist.owner.href.match(/\w+$/g)).then((res: any) => setOwner(res.body))
    }
  }, [playlist])


  if(!playlist)
    return (
      <Stack margin="auto">
        <Skeleton height="20px" width="2xl"></Skeleton>
        <Skeleton height="20px" width="2xl"></Skeleton>
        <Skeleton height="20px" width="2xl"></Skeleton>
        <Skeleton height="32" width="2xl"></Skeleton>
      </Stack>
    )

  return (
    <>
    {/* @ts-ignore */}
    <Navbar user={session?.user}/>
    <Box margin="auto" width="container.md" p="3" mt="2">
      <Link href="/"><HStack m="2" color="spotify.400" fontSize="lg" fontWeight="semibold" cursor="pointer" _hover={{ color: "spotify.100" }}> <FaArrowLeft /> <Text>Go home</Text> </HStack></Link>
      <HStack p="2" gap="6">
        <Image src={playlist?.images[0].url} boxSize="32" objectFit="cover"/>
        <Box>
          <Text fontSize="4xl">{playlist?.name}</Text>
          <Text fontSize="2xl">{playlist?.description}</Text>
          <Text>Followers: {playlist?.followers.total}</Text>
        </Box>
        <VStack>
          <Text>Owner:</Text>
          <HStack bg="blackAlpha.400" p="2" rounded="2xl">
            <Image src={owner?.images[0].url} boxSize="14"/>
            <Text>{owner?.display_name}</Text>
          </HStack>
        </VStack>
      </HStack>
      <Divider mt="2" mb="2"/>
      <HStack p="2">
        <Text fontSize="xl">Rate this playlist</Text>
        <Slider aria-label="rating-slider" width="50%" min={0} max={10} step={0.5} defaultValue={5}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </HStack>
      <iframe src={`https://open.spotify.com/embed/playlist/${playlist.id}`} width="100%" height="400px" frameBorder="0" allow="encrypted-media"></iframe>
    </Box>
    </>
  )
}

export default Playlist

