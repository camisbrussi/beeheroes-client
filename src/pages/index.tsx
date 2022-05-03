import { Box } from "@chakra-ui/react";
import { hotjar } from "react-hotjar";

import { Banner } from "../components/Banner";
import { SearchTypes } from "../components/SearchTypes";
import { Header } from "../components/Header";
import { useLayoutEffect } from "react";

export default function Home() {
  useLayoutEffect(() => {
    hotjar.event("button-click");
  }, []);

  return (
    <Box w="100vw" h="100vh">
      <Header />
      <Banner />
      <SearchTypes />]
    </Box>
  );
}
