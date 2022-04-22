import { Link, Box, Badge, Flex } from "@chakra-ui/react";
import { Donation } from "../../@types/donation";

interface CardInfoProps {
  data: Donation;
  status?: {
    color: string;
    name: string;
  };
}

export function CardDonation({ data, status = null }: CardInfoProps) {
  const value = data?.total_value?.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  const collected = data?.total_collected?.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <Box
      maxW="xs"
      minW="xs"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="white"
      boxShadow="md"
    >
      <Link href={`/projects//${data.id}`}>
        <Box p="6">
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {data.name}
          </Box>
          <Box alignItems="center">
            <Badge borderRadius="full" colorScheme={status?.color}>
              {status?.name}
            </Badge>
          </Box>
          {value ? (
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              mt={3}
            >
              <Box>{value} (Valor Necessário)</Box>
              <Box>&bull;</Box>
              <Box>{collected} (Valor Arrecadado)</Box>
            </Box>
          ) : (
            <Box>Local de coleta na descrição da doação</Box>
          )}
        </Box>
      </Link>
    </Box>
  );
}
