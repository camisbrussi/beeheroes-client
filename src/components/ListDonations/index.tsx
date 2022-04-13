import { HStack, Text, Box, Divider, Link, Tag, Flex } from "@chakra-ui/react";
import { Card } from "./Card";

interface ListDonationsProps {
  data: DonationProps[];
  isResponsible?: boolean;
  organizationId?: boolean;
}

export type DonationProps = {
  id: string;
  name: string;
  total_value?: number;
  total_collected?: number;
};

export const ListDonations = ({
  data,
  isResponsible,
  organizationId,
}: ListDonationsProps) => {
  return (
    <Box w={1160} mt={20} mx="auto" fontSize="lg">
      <Divider borderColor="blue.600" />
      <Flex>
        <Text mt={8}>Doações em andamento</Text>
        <Link href={`/project/busca/${organizationId}`}>
          <Tag mt={8} ml={3} colorScheme="yellow">
            Ver Todos
          </Tag>
        </Link>

        {isResponsible && (
          <Link href={`/donation/register/${organizationId}`}>
            <Tag mt={8} ml={3} colorScheme="yellow">
              Adicionar Doação
            </Tag>
          </Link>
        )}
      </Flex>
      <HStack spacing="20" align="left" w={1160} mt={10} mx="auto">
        {data?.map((donation) => (
          <Card key={donation.id} data={donation} />
        ))}
      </HStack>
    </Box>
  );
};
