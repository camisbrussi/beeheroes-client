import {
  Box,
  useBreakpointValue,
  Text,
  Image,
  HStack,
  Stack,
} from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import { Address } from "../../components/Address";

import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { InfoOrganization } from "../../components/infoOrganizations";
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
  address: Address;
  images_url: string[];
  projects: ListCardProjectsProps[];
  donations: ListCardDonationsProps[];
};

export default function Project({ organization }: OrganizationProps) {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
  return (
    <Box w="100%" minW={1440}>
      <Header hasBackButton />
      <Slide imagesUrl={organization?.images_url} />
      <InfoOrganization data={organization} />
      <Address data={organization?.address} />
      <ListProjects data={organization?.projects} />
      <ListDonations data={organization?.donations} />
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
