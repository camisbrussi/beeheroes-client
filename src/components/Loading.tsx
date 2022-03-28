import { Box, Spinner } from "@chakra-ui/react";

export function Loading() {
  return (
    <Box align="center" justify="center" mt={20}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="yellow.400"
        size="xl"
      />
    </Box>
  );
}
