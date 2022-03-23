import { HStack, Text, Box, Divider } from "@chakra-ui/react";
import { Card } from "./Card";

export interface ListCardDonationsProps {
  id: string;
  name: string;
  total_value?: number;
  total_collected?: number;
}
interface ListDonationsProps {
  data: ListCardDonationsProps[];
}

export const ListDonations = ({ data }: ListDonationsProps) => {
  return (
    <Box w={1160} mt={20} mx="auto" fontSize="lg">
      <Divider />
      <Text mt={5}>Doações em andamento</Text>
      <HStack spacing="20" align="left" w={1160} mt={10} mx="auto">
        {data?.map((donation) => (
          <Card
            name={donation.name}
            id={donation.id}
            key={donation.id}
            total_value={donation.total_value}
            total_collected={donation.total_collected}
          />
        ))}
      </HStack>
    </Box>
  );
};
