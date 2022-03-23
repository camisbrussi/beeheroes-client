import {
  Box,
  useBreakpointValue,
  Text,
  Image,
  HStack,
  Stack,
} from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";

import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import {
  ListCardDonationsProps,
  ListDonations,
} from "../../components/ListDonations";
import {
  ListCardProjectsProps,
  ListProjects,
} from "../../components/ListProjects";
import { Slide } from "../../components/Slide";
import { api } from "../../services/apiCLient";

interface OrganizationProps {
  organization: Organization;
}

type Organization = {
  id: string;
  name: string;
  description: string;
  email: string;
  cnpj: string;
  avatar_url: string;
  organization_type: {
    name: string;
    description: string;
  };
  address: {
    street: string;
    number: string;
    complement: string;
    district: string;
    city: string;
    uf: string;
  };
  images_url: string[];
  projects: ListCardProjectsProps[];
  donations: ListCardDonationsProps[];
};

export default function Search({ organization }: OrganizationProps) {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
  return (
    <Box w="100%" minW={1440}>
      <Header hasBackButton />
      <Slide imagesUrl={organization?.images_url} />
      <HStack spacing="20" justify="space-between" w={1160} mt={20} mx="auto">
        <Stack>
          <Text as="h1" fontSize="5xl">
            {organization?.name}{" "}
            <Text fontSize="md">({organization?.organization_type?.name})</Text>
          </Text>

          <Text fontSize="lg">{organization?.description}</Text>

          <Text fontSize="lg">
            Cidade: {organization?.address?.city}/{organization?.address?.uf}
          </Text>

          <Text fontSize="md">E-mail: {organization?.email}</Text>
        </Stack>

        <Image
          ml="10px"
          boxSize="250px"
          objectFit="cover"
          borderRadius="10"
          src={organization?.avatar_url}
          alt={organization?.name}
        />
      </HStack>
      <ListProjects projects={organization?.projects} />
      <ListDonations donations={organization?.donations} />
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
  let organization: Organization;

  const { slug } = params;

  await api
    .get<Organization>(`/organizations/find/?id=${slug}`)
    .then((response) => {
      organization = response.data;
    });

  return {
    props: {
      organization,
    },
    revalidate: 60 * 60, // 1 hour,
  };
};
