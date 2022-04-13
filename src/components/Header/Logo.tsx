import { Flex, Text, useBreakpointValue, Image } from "@chakra-ui/react";
import Link from "next/link";

export function Logo() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
  return (
    <Link href="/" passHref={true}>
      <Flex w="100%" maxW={isWideVersion ? "20%" : "100%"} align="center">
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
  );
}
