import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    blue: {
      '600': '#4D6F80'
    }
  },
  fonts: {
    heading: 'Nunito',
    body: 'Nunito'
  },
  styles: {
    global: {
      body:{
        bg: 'blue.50',
        color: 'blue.600'
      }
    }
  }
})