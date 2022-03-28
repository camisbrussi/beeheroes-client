import { Flex, Text } from "@chakra-ui/react";

export function Footer() {
  return (
    <Flex
      w="100%"
      h="50px"
      mx={["auto", "0"]}
      mt="100px"
      bg="white"
      borderTopRadius="10"
      direction="column"
      align="center"
    >
      <Text color="gray.500" fontSize="md" fontWeight="500" mb="20px" mt="20px">
        contato@beeheroes.com.br
      </Text>
    </Flex>
  );
}
