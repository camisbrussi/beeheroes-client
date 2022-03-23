import {
  Box,
  useBreakpointValue,
  Text,
  Image,
  HStack,
  Stack,
  Divider,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import { RiHandCoinLine } from "react-icons/ri";

import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { api } from "../../services/apiCLient";
import { Button } from "../../components/Button";
import {
  InfoOrganization,
  OrganizationInfo,
} from "../../components/infoOrganizations";
import { Address } from "../../components/Address";

interface DonationProps {
  donation: Donation;
}

type Donation = {
  id: string;
  name: string;
  description: string;
  total_value: number;
  total_collected: number;
  status: number;
  address: Address;
  organization: OrganizationInfo;
};

export default function Search({ donation }: DonationProps) {
  const value = donation?.total_value?.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  const collected = donation?.total_collected?.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  const slug = donation?.organization?.id;

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
  return (
    <Box w="100%" minW={1440}>
      <Header hasBackButton />
      <HStack spacing="20" justify="space-between" w={1160} mt={20} mx="auto">
        <Stack>
          <Text as="h1" fontSize="5xl">
            {donation?.name}
          </Text>

          <Text fontSize="lg">{donation?.description}</Text>
          <Flex align="center">
            <Icon as={RiHandCoinLine} mx="2" />
            <Text fontSize="md">{value}</Text>
            <Text fontSize="xs" ml="1">
              (Valor necessário)
            </Text>
          </Flex>
          <Flex align="center" mt="2">
            <Icon
              as={RiHandCoinLine}
              mx="2"
              color={collected < value ? "red" : "green"}
            />
            <Text fontSize="md">{collected}</Text>
            <Text fontSize="xs" ml="1">
              (Valor arrecadado)
            </Text>
          </Flex>
          <Button title="Fazer Doação" />
        </Stack>
        <Image
          ml="10px"
          objectFit="cover"
          borderRadius="10"
          src="/images/donationlogo.svg"
          alt="Favo de mel com um desenho de coração no meio e flores"
        />
      </HStack>

      {donation?.address && (
        <Box w={1160} mt={20} mx="auto" fontSize="lg">
          <Divider mt="20px" />
          <Text mt={5} mb={5}>
            Local Da coleta
          </Text>
          <Address data={donation?.address} />
        </Box>
      )}

      <Box w={1160} mt={20} mx="auto" fontSize="lg">
        <Divider mt="20px" />
        <Text mt={5}>Organização Responsável pela doações</Text>

        <InfoOrganization data={donation?.organization} hasVisitButton />
      </Box>
      <Footer />
    </Box>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let donation: Donation;

  const { slug } = params;

  await api.get<Donation>(`/donations/find/?id=${slug}`).then((response) => {
    donation = response.data;
  });

  return {
    props: {
      donation,
    },
    revalidate: 60 * 60, // 1 hour,
  };
};
