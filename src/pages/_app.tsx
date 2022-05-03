import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/theme";
import { AuthProvider } from "../context/AuthContext";
import { hotjar } from "react-hotjar";
import { useEffect } from "react";
import { useRouter } from "next/router";

import "../styles/slide.scss";

// Import Swiper styles
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/scss/scrollbar";
import { Header } from "../components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    hotjar.initialize(2953049, 6);
  }, []);

  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  );
}

export default MyApp;
