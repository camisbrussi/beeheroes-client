import {
  Box,
  Text,
  Image,
  HStack,
  Stack,
  Divider,
  Flex,
  Icon,
  Spinner,
} from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import { RiHandCoinLine } from "react-icons/ri";

import { Header } from "../../components/Header";
import { api } from "../../services/apiCLient";
import { Button } from "../../components/Button";
import { AddressData } from "../../components/Infos/Address";
import { Loading } from "../../components/Loading";
import { Donation } from "../../@types/donation";
import { OrganizationInfos } from "../../components/Infos/Organizations";
interface DonationProps {
  donation: Donation;
}

export default function DonationData({ donation }: DonationProps) {
  const value = donation?.total_value?.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  const collected = donation?.total_collected?.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <Box w="100%" minW={1440}>
      <Header />
      {donation ? (
        <>
          <HStack
            spacing="20"
            justify="space-between"
            w={1160}
            mt={20}
            mx="auto"
          >
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
              <AddressData data={donation?.address} />
            </Box>
          )}

          <Box w={1160} mt={20} mx="auto" fontSize="lg">
            <Divider mt="20px" />
            <Text mt={5}>Organização Responsável pela solicitação</Text>

            <OrganizationInfos data={donation?.organization} hasVisitButton />
          </Box>
        </>
      ) : (
        <Loading />
      )}
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
