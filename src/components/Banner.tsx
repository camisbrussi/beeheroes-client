import {
  Flex,
  VStack,
  Image,
  Text,
  useBreakpointValue,
  Stack,
} from "@chakra-ui/react";
import { LogoHorizontal } from "./LogoHorizontal";

export function Banner() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Flex
      w="100%"
      height={isWideVersion ? "335" : "170"}
      align="center"
      bg="url('/images/background.svg')"
      p={isWideVersion ? "200" : "10"}
    >
      <VStack spacing={4} px={["4", "10"]} mt={isWideVersion ? "10" : "40"}>
        <LogoHorizontal />
        <Text
          fontSize="2xl"
          align="center"
          color="brown.600"
          textShadow="1px 1px #D9A404"
        >
          Seja importante para a sociedade assim <br /> como as abelhas são para
          a natureza
        </Text>
        <Text
          color="brown.600"
          align="center"
          fontSize={["sm", "xl"]}
          textShadow="1px 1px #D9A404"
          fontWeight="regular"
          w={524}
        >
          Seja voluntário e mude o mundo
        </Text>
      </VStack>
      {isWideVersion && (
        <Image
          src="/images/workbee.svg"
          alt="logo"
          mt={isWideVersion ? "38" : "40"}
          ml="60"
          boxSize="300px"
        />
      )}
    </Flex>
  );
}
