import { extendTheme } from '@chakra-ui/react'

// 2. Add your color mode config
const config = {
  config: { 
    initialColorMode: 'dark',
    useSystemColorMode: false
  },
  colors: {
    spotify: {
      100: "#FFFFFF",
      400: "#1DB954",
      900: "#191414"
    }
  }
}

// 3. extend the theme
const theme = extendTheme(config)

export default theme