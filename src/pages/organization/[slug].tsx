import { Box, Divider, Text, useBreakpointValue } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import { Address } from "../../components/Infos/Address";

import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import {
  InfoOrganization,
  Organization,
} from "../../components/Infos/Organizations";
import { ListDonations, DonationProps } from "../../components/ListDonations";
import { ListProjects, ProjectProps } from "../../components/ListProjects";

import { Loading } from "../../components/Loading";
import { ProfileAvatar } from "../../components/ProfileAvatar";
import { Slide } from "../../components/Slide";
import { api } from "../../services/apiCLient";

interface Organizations {
  organizationData: OrganizationProps;
}

type Responsibles = {
  name: string;
  user_id: string;
  avatar_url: string;
};

type OrganizationProps = {
  organization: InfoOrganization;
  address: Address;
  images_url: string[];
  projects: ProjectProps[];
  donations: DonationProps[];
  responsibles: Responsibles[];
};

export default function OrganizationData({ organizationData }: Organizations) {
  return (
    <Box w="100%" minW={1440}>
      <Header hasBackButton />
      {organizationData ? (
        <>
          <Slide imagesUrl={organizationData?.images_url} />
          <Organization data={organizationData?.organization} />
          <Address data={organizationData?.address} />
          <ListProjects data={organizationData?.projects} />
          <ListDonations data={organizationData?.donations} />
          <Box w={1160} mt={20} mx="auto" fontSize="lg">
            <Divider mt="20px" />
            <Text mt={5}>Responsáveis pela organização</Text>

            {organizationData?.responsibles?.map((responsible) => (
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
