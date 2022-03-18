import {
  Flex,
  Image,
  Link as ChakraLink,
  Icon,
  useBreakpointValue,
  Text,
} from "@chakra-ui/react";
import { FiChevronLeft } from "react-icons/fi";
import Link from "next/link";
import { LogoHorizontal } from "./LogoHorizontal";

interface HeaderProps {
  hasBackButton?: boolean;
}

export function Header({ hasBackButton }: HeaderProps) {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Flex
      as="header"
      w="100%"
      maxW={1440}
      h={isWideVersion ? "100" : "50"}
      mx="auto"
      align="center"
      mt="1"
    >
      {hasBackButton && (
        <Link href="/">
          <ChakraLink position="absolute" left={["16px", "40px"]}>
            <Icon as={FiChevronLeft} fontSize={["1rem", "2rem"]} />
          </ChakraLink>
        </Link>
      )}
      <Flex
        w="100%"
        maxW={isWideVersion ? "200" : "100"}
        align="center"
        mx="auto"
      >
        <Image src="/images/logo.svg" alt="logo" m="auto" boxSize="60px" />
        <Text
          as="b"
          fontSize="2xl"
          color="brown.600"
          textShadow="2px 2px #D9A404"
        >
          Be Heeroes
        </Text>
      </Flex>
    </Flex>
  );
}
