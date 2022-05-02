import {
  Flex,
  useBreakpointValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { Profile } from "./Profile";
import { Logo } from "./Logo";
import { Sidebar } from "../Sidebar";

export function Header() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
  return (
    <>
      <Flex
        as="header"
        w={isWideVersion ? "100%" : "150%"}
        //maxWidth={1480}
        h={isWideVersion ? "65" : "30"}
        //mx="auto"
        align="center"
        px="20"
        justify="space-between"
        borderBottom="1px"
        borderColor="blue.600"
        bg="blue.100"
      >
        <Logo />
        <Flex>
          <Profile />
          <Sidebar />
        </Flex>
      </Flex>
      <Alert status="warning">
        <AlertIcon />
        Esse site foi construído para uma pesquisa do trabalho de conclusão, os
        dados apresentados são fictícios.
      </Alert>
    </>
  );
}
