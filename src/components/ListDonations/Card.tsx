import { Divider, Flex, Icon, Link, Text, Center } from "@chakra-ui/react";
import { MdOutlineRealEstateAgent } from "react-icons/md";

interface CardInfoProps {
  id: string;
  name: string;
  total_value?: number;
  total_collected?: number;
}

export function Card({
  name,
  total_value,
  total_collected,
  id,
}: CardInfoProps) {
  const value = total_value?.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
  const collected = total_collected?.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
  return (
    <Flex
      w="250px"
      h="210px"
      bg="white"
      borderRadius="10"
      borderColor="yellow.100"
      align="center"
      justify="center"
    >
      <Link href={`/donation/${id}`}>
        <Center w="200px" h="80px">
          <Text
            align="center"
            color="gray.500"
            fontSize="lg"
            fontWeight="500"
            mb="20px"
            mt="20px"
          >
            {name}
          </Text>
        </Center>
        {total_value && (
          <Flex align="center" mt="2">
            <Icon as={MdOutlineRealEstateAgent} mx="2" color="green" />
            <Text fontSize="md">{value}</Text>
          </Flex>
        )}
        <Divider mt="3" />
        <Flex align="center" justify="center" mt="2" mb="5">
          {total_collected ? (
            <Text fontSize="md">{collected} (Total Coletado)</Text>
          ) : (
            <Text fontSize="md">Em aberto</Text>
          )}
        </Flex>
      </Link>
    </Flex>
  );
}
