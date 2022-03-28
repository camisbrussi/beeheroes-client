import { HStack, Text, Box, Divider } from "@chakra-ui/react";
import { Card } from "./Card";

interface ListDonationsProps {
  data: DonationProps[];
}

export type DonationProps = {
  id: string;
  name: string;
  total_value?: number;
  total_collected?: number;
};

export const ListDonations = ({ data }: ListDonationsProps) => {
  return (
    <Box w={1160} mt={20} mx="auto" fontSize="lg">
      <Divider />
      <Text mt={5}>Doações em andamento</Text>
      <HStack spacing="20" align="left" w={1160} mt={10} mx="auto">
        {data?.map((donation) => (
          <Card key={donation.id} data={donation} />
        ))}
      </HStack>
    </Box>
  );
};
