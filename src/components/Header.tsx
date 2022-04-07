import {
  Flex,
  Image,
  Link as ChakraLink,
  Icon,
  useBreakpointValue,
  Text,
  Button,
  IconButton,
  HStack,
  Divider,
} from "@chakra-ui/react";
import { FiChevronLeft } from "react-icons/fi";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSidebarDrawer } from "../contexts/SidebarDrawerContexts";
import { RiMenuLine } from "react-icons/ri";
import { Sidebar } from "./Sidebar";

export function Header() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <HStack
      as="header"
      w="100%"
      h={isWideVersion ? "62" : "30"}
      mx="auto"
      align="center"
      px="6"
      justify="space-between"
      borderBottom="1px"
      borderColor="blue.600"
      bg="blue.100"
    >
      <Link href="/" passHref={true}>
        <Flex
          w="100%"
          maxW={isWideVersion ? "200" : "100"}
          align="center"
          // mx="auto"
        >
          <Image
            src="/images/logo.svg"
            alt="logo"
            ml="auto"
            mr={2}
            boxSize={isWideVersion ? "40px" : "25px"}
          />

          <Text
            as="b"
            fontSize={isWideVersion ? "xl" : "xs"}
            color="brown.600"
            textShadow="2px 2px #D9A404"
          >
            Bee Heroes
          </Text>
        </Flex>
      </Link>
      <Sidebar />
    </HStack>
  );
}
