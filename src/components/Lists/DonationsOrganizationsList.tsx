import {
  Text,
  Box,
  Divider,
  Link,
  Tag,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Donation } from "../../@types/donation";
import { DonationList } from "./DonationList";

interface ListDonationsProps {
  data: Donation[];
  isResponsible?: boolean;
  organizationId?: boolean;
}

export const ListDonations = ({
  data,
  isResponsible,
  organizationId,
}: ListDonationsProps) => {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
  return (
    <Box w={1160} mt={20} mx="auto" fontSize="lg">
      <Divider borderColor="blue.600" />
      <Flex>
        {data.length ? (
          <Flex>
            <Text mt={8}>Doações em andamento</Text>
            <Link href={`/busca/donations?organization_id=${organizationId}`}>
              <Tag mt={8} ml={3} colorScheme="yellow">
                Ver Todos
              </Tag>
            </Link>
          </Flex>
        ) : (
          <Text mt={8}>A organização ainda não possui doações cadastradas</Text>
        )}
        {isResponsible && (
          <Link href={`/donations/register/${organizationId}`}>
            <Tag mt={8} ml={3} colorScheme="yellow">
              Adicionar Doação
            </Tag>
          </Link>
        )}
      </Flex>
      <DonationList items={data} />
    </Box>
  );
};
