import { Box } from "@chakra-ui/react";

import { Banner } from "../components/Banner";
import { SearchTypes } from "../components/SearchTypes";
import { Header } from "../components/Header";

export default function Home() {
  return (
    <Box w="100vw" h="100vh">
      <Header />
      <Banner />
      <SearchTypes />]
    </Box>
  );
}
