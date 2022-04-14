import { Flex, Image, Text, useBreakpointValue } from "@chakra-ui/react";

export function LogoHorizontal() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Flex w="100%" maxW={isWideVersion ? "600" : "300"} mx="auto" mt="60px">
      <Image src="/images/logo.svg" alt="logo" m="auto" boxSize="100px" />
      <Text
        as="b"
        m="auto"
        fontSize={isWideVersion ? "5xl" : "3xl"}
        color="brown.600"
        textShadow="3px 3px #D9A404"
      >
        Bee Heroes
      </Text>
    </Flex>
  );
}
