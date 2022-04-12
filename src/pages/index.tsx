import {
  Box,
  Modal,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";

import { Banner } from "../components/Banner";
import { SearchTypes } from "../components/SearchTypes";
import { RegisterSelect } from "../components/modais/RegisterSelect";
import { Header } from "../components/Header";

export default function Home() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box w="100vw" h="100vh">
      <Header />
      <Banner />
      <SearchTypes />]
      <Modal isOpen={isOpen} onClose={onClose}>
        <RegisterSelect />
      </Modal>
    </Box>
  );
}
