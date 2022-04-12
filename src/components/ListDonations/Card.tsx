import { Divider, Flex, Icon, Link, Text, Center, Box } from "@chakra-ui/react";
import { MdOutlineRealEstateAgent } from "react-icons/md";
import { DonationProps } from ".";

interface CardDonationInfoProps {
  data: DonationProps;
}

export function Card({ data }: CardDonationInfoProps) {
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
      w="xl"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="white"
      boxShadow="md"
      p="6"
    >
      <Box h="80px">
        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
          <Link href={`/donation/${data?.id}`}>
            <Text
              align="center"
              color="gray.500"
              fontSize="lg"
              fontWeight="500"
              mb="20px"
              mt="20px"
            >
              {data?.name}
            </Text>
          </Link>
        </Box>
      </Box>
      <Box h="50px">
        {data?.total_value && (
          <Flex align="center" mt="2">
            <Icon as={MdOutlineRealEstateAgent} mx="2" color="green" />
            <Text fontSize="md">{value}</Text>
          </Flex>
        )}
      </Box>
      <Divider mt="3" borderColor="blue.600" />
      <Flex align="center" justify="center" mt="2" mb="5">
        {data?.total_value ? (
          <Text fontSize="sm">{collected} (Total Coletado)</Text>
        ) : (
          <Text fontSize="sm">Em Aberto</Text>
        )}
      </Flex>
    </Box>
  );
}
