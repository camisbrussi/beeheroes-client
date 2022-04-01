import { Box, Modal, Stack, useDisclosure } from "@chakra-ui/react";
import Router from "next/router";

import { Banner } from "../components/Banner";
import { Button } from "../components/Button";
import { SearchTypes } from "../components/SearchTypes";
import { Footer } from "../components/Footer";
import { RegisterSelect } from "../components/modais/RegisterSelect";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box w="100vw" h="100vh" minW={1440} mx="auto">
      <Stack
        direction="row"
        justify="end"
        mt="10"
        mx="230px"
        left={["16px", "40px"]}
      >
        <Button onClick={onOpen} title="Fazer Cadastro" />
        <Button onClick={() => Router.push("/signin")} title="Fazer Login" />
      </Stack>
      <Banner />
      <SearchTypes />
      <Footer />
      <Modal isOpen={isOpen} onClose={onClose}>
        <RegisterSelect />
      </Modal>
    </Box>
  );
}
