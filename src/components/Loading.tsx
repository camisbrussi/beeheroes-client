import { Box, Flex, Spinner } from "@chakra-ui/react";

export function Loading() {
  return (
    <Flex align="center" justifyContent="center" mt={20}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="yellow.400"
        size="xl"
      />
    </Flex>
  );
}
