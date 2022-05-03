import {
  Box,
  Text,
  Image,
  HStack,
  Stack,
  Divider,
  Flex,
  Icon,
  Link,
  Tag,
} from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import { RiHandCoinLine } from "react-icons/ri";

import { Header } from "../../components/Header";
import { api } from "../../services/apiCLient";
import { Loading } from "../../components/Loading";
import { Donation } from "../../@types/donation";
import { OrganizationInfos } from "../../components/Infos/Organizations";
import { OrganizationProps } from "../../@types/organization";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { withSSRGuest } from "../../utils/withSSRGuest";
interface DonationProps {
  donation: Donation;
  organization: OrganizationProps;
}

export default function DonationData({
  donation,
  organization,
}: DonationProps) {
  const [isResponsible, setIsResponsible] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    organization?.responsibles?.map((responsible) => {
      responsible?.user_id === user?.id && setIsResponsible(true);
    });
  }, [organization, user]);

  const value = donation?.total_value?.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  const collected = donation?.total_collected?.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  const statusDonation = (status) => {
    switch (status) {
      case 1:
        return "Ativa";
      case 2:
        return "Finalizada";
      case 3:
        return "Suspensa";
    }
  };

  return (
    <Box w="100%" minW={1440} pb={10}>
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
              <Text as="h1" fontSize="md" m={3}>
                status: {statusDonation(donation?.status)}
              </Text>
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
              {isResponsible && (
                <Flex justify="center">
                  <Link href={`/donations/edit/${donation?.id}`}>
                    <Tag mt={8} ml={3} colorScheme="yellow">
                      Editar dados
                    </Tag>
                  </Link>
                </Flex>
              )}
            </Stack>
            <Image
              ml="10px"
              objectFit="cover"
              borderRadius="10"
              src="/images/donationlogo.svg"
              alt="Favo de mel com um desenho de coração no meio e flores"
              boxSize="300px"
            />
          </HStack>

          <Box w={1160} mt={20} mx="auto" fontSize="lg">
            <Divider mt="20px" borderColor="blue.600" />
            <Text mt={5}>Organização Responsável pela solicitação</Text>

            <OrganizationInfos data={organization} hasVisitButton />
          </Box>
        </>
      ) : (
        <Loading />
      )}
    </Box>
  );
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
  let donation: Donation;
  let organization: OrganizationProps;

  const { slug } = ctx.params;

  await api.get<Donation>(`/donations/find/?id=${slug}`).then((response) => {
    donation = response.data;
  });

  await api
    .get<OrganizationProps>(
      `/organizations/find/?id=${donation.organization_id}`
    )
    .then((response) => {
      organization = response.data;
    });

  return {
    props: {
      donation,
      organization,
    },
  };
});
