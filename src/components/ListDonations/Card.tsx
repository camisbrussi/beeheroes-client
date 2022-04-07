import { Divider, Flex, Icon, Link, Text, Center } from "@chakra-ui/react";
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
    <Flex
      w="250px"
      h="210px"
      bg="white"
      borderRadius="10"
      align="center"
      justify="center"
      boxShadow="md"
    >
      <Link href={`/donation/${data?.id}`}>
        <Center w="200px" h="80px">
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
        </Center>
        {data?.total_value && (
          <Flex align="center" mt="2">
            <Icon as={MdOutlineRealEstateAgent} mx="2" color="green" />
            <Text fontSize="md">{value}</Text>
          </Flex>
        )}
        <Divider mt="3" />
        <Flex align="center" justify="center" mt="2" mb="5">
          {data?.total_collected ? (
            <Text fontSize="md">{collected} (Total Coletado)</Text>
          ) : (
            <Text fontSize="md">Em aberto</Text>
          )}
        </Flex>
      </Link>
    </Flex>
  );
}
