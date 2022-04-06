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
} from "@chakra-ui/react";
import { FiChevronLeft } from "react-icons/fi";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSidebarDrawer } from "../contexts/SidebarDrawerContexts";
import { RiMenuLine } from "react-icons/ri";
import { Sidebar } from "./Sidebar";

export function Header() {
  const { onOpen } = useSidebarDrawer();
  const router = useRouter();
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <HStack
      as="header"
      w="100%"
      maxW={1440}
      h={isWideVersion ? "100" : "50"}
      mx="auto"
      justify="space-between"
      mt="1"
    >
      {!isWideVersion && (
        <IconButton
          aria-label="Open Navigation"
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          mr="2"
        ></IconButton>
      )}
      <Link href="/" passHref={true}>
        <Flex
          w="100%"
          maxW={isWideVersion ? "200" : "100"}
          align="center"
          // mx="auto"
        >
          <Image src="/images/logo.svg" alt="logo" m="auto" boxSize="60px" />

          <Text
            as="b"
            fontSize="2xl"
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
