import {
  Flex,
  VStack,
  Image,
  Text,
  useBreakpointValue,
  HStack,
} from "@chakra-ui/react";
import { LogoHorizontal } from "./LogoHorizontal";

export function Banner() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <HStack spacing="130" align="left" w={1160} mt={10} mx="auto">
      <VStack spacing={4} align="left" px={["4", "10"]}>
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
      <Image
        src="/images/workbee.svg"
        alt="logo"
        mt="10"
        ml="60"
        boxSize="300px"
      />
    </HStack>
  );
}
