import {
  Box,
  Modal,
  Stack,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import Router from "next/router";

import { useSidebarDrawer } from "../contexts/SidebarDrawerContexts";
import { Banner } from "../components/Banner";
import { Button } from "../components/Button";
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
    <Box w="100vw">
      <Header />
      <Banner />
      <SearchTypes />
      <Modal isOpen={isOpen} onClose={onClose}>
        <RegisterSelect />
      </Modal>
    </Box>
  );
}
