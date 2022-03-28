import {
  Flex,
  Image,
  Link as ChakraLink,
  Icon,
  useBreakpointValue,
  Text,
  Button,
} from "@chakra-ui/react";
import { FiChevronLeft } from "react-icons/fi";
import { useRouter } from "next/router";
import Link from "next/link";

interface HeaderProps {
  hasBackButton?: boolean;
}

export function Header({ hasBackButton }: HeaderProps) {
  const router = useRouter();
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
        <Button onClick={() => router.back()} color="brown.600" variant="link">
          <ChakraLink position="absolute" left={["16px", "40px"]}>
            <Icon as={FiChevronLeft} fontSize={["1rem", "2rem"]} />
          </ChakraLink>
        </Button>
      )}
      <Link href="/" passHref={true}>
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
            Bee Heroes
          </Text>
        </Flex>
      </Link>
    </Flex>
  );
}
