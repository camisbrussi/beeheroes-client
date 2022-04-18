import { StarIcon } from "@chakra-ui/icons";
import { Box, Flex, Text, Avatar } from "@chakra-ui/react";

export function ItemEvaluation() {
  return (
    <Flex maxW="xl" overflow="hidden">
      <Avatar mt={5} />
      <Box m={5}>
        <Text>Nome Organização</Text>
        <Text fontSize="sm">Comentário</Text>
      </Box>
      <Box display="flex" mt="2" alignItems="center">
        {Array(5)
          .fill("")
          .map((_, i) => (
            <StarIcon key={i} color={i < 5 ? "teal.500" : "gray.300"} />
          ))}
      </Box>
    </Flex>
  );
}
