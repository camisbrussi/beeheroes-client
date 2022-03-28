import { Box, Divider, Text, useBreakpointValue } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import { Address } from "../../components/Address";

import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { InfoOrganization } from "../../components/Infos/infoOrganizations";
import { ListDonations, DonationProps } from "../../components/ListDonations";
import { ListProjects, ProjectProps } from "../../components/ListProjects";

import { Loading } from "../../components/Loading";
import { ProfileAvatar } from "../../components/ProfileAvatar";
import { Slide } from "../../components/Slide";
import { api } from "../../services/apiCLient";

interface Organizations {
  organization: OrganizationProps;
}

type Responsibles = {
  name: string;
  user_id: string;
  avatar_url: string;
};

type OrganizationProps = {
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
  projects: ProjectProps[];
  donations: DonationProps[];
  responsibles: Responsibles[];
};

export default function Organization({ organization }: Organizations) {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
  return (
    <Box w="100%" minW={1440}>
      <Header hasBackButton />
      {organization ? (
        <>
          <Slide imagesUrl={organization?.images_url} />
          <InfoOrganization data={organization} />
          <Address data={organization?.address} />
          <ListProjects data={organization?.projects} />
          <ListDonations data={organization?.donations} />
          <Box w={1160} mt={20} mx="auto" fontSize="lg">
            <Divider mt="20px" />
            <Text mt={5}>Responsáveis pela organização</Text>

            {organization?.responsibles?.map((responsible) => (
              <ProfileAvatar key={responsible.user_id} data={responsible} />
            ))}
          </Box>
          <Footer />
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
  let organization: OrganizationProps;

  const { slug } = params;

  await api
    .get<OrganizationProps>(`/organizations/find/?id=${slug}`)
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
