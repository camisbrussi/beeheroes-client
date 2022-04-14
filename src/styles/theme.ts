import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    blue: {
      "600": "#4D6F80",
      "40": "#F5F8FA",
      "100": "#ADC8D9",
      "400": "#78AFD1",
    },
    yellow: {
      "400": "#F0C118",
    },
    brown: {
      "300": "#948178",
      "600": "#41291E",
    },
  },
  fonts: {
    heading: "Nunito",
    body: "Nunito",
  },
  styles: {
    global: {
      body: {
        bg: "blue.100",
        color: "blue.600",
      },
      a: {
        _hover: {
          textDecoration: "none",
        },
      },
    },
  },
  components: {
    Divider: {
      borderColor: "blue.600",
      size: "50",
    },
  },
});
