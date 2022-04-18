import { StarIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  Link,
  Avatar,
} from "@chakra-ui/react";
import { ItemEvaluation } from "./item";

export function Evaluation() {
  return (
    <Box maxW="xl" overflow="hidden" mt={5}>
      <Flex justify="space-between">
        <Text mx={5}>Avaliações </Text>
        <Text mx={5} fontSize="sm" fontWeight="bold">
          Ver Todas
        </Text>
      </Flex>
      <ItemEvaluation />
    </Box>
  );
}
