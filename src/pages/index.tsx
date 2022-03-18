import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Banner } from "../components/Banner";
import { Button } from "../components/Button";
import { SearchTypes } from "../components/SearchTypes";
import { Footer } from "../components/Footer";

export default function Home() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
  return (
    <Box w="100vw" h="100vh" minW={1440} mx="auto">
      <Stack
        direction="row"
        justify="end"
        mt="10"
        mx="230px"
        left={["16px", "40px"]}
      >
        <Button title="Fazer Cadastro" />
        <Button title="Fazer Login" />
      </Stack>
      <Banner />
      <SearchTypes />
      <Footer />
    </Box>
  );
}
