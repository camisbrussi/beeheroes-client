import { Flex, Image, Text, useBreakpointValue } from "@chakra-ui/react";

export function Logo() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Flex
      w="100%"
      maxW={isWideVersion ? "500" : "300"}
      mx="auto"
      mt={isWideVersion ? "60px" : "30px"}
      align="center"
      flexDir="column"
    >
      <Image
        boxSize={isWideVersion ? "200" : "150"}
        src="/images/logo.svg"
        alt="logo"
        m="auto"
        w={isWideVersion ? "184" : "50"}
      />
      <Text
        as="b"
        fontSize={isWideVersion ? "5xl" : "4xl"}
        color="brown.600"
        textShadow="3px 3px #D9A404"
      >
        Bee Heroes
      </Text>
      {isWideVersion && (
        <Text
          fontSize="3xl"
          align="center"
          color="brown.600"
          textShadow="1px 1px #D9A404"
        >
          O trabalho em conjunto pode tornar o mundo um lugar melhor para todos
        </Text>
      )}
    </Flex>
  );
}
