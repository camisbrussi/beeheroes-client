import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";

import { Header } from "../../components/Header";

import { ListDonations } from "../../components/ListDonations";
import { ListProjects } from "../../components/ListProjects";

import { Loading } from "../../components/Loading";
import { ProfileAvatar } from "../../components/ProfileAvatar";
import { Slide } from "../../components/Slide";
import { AddressData } from "../../components/Infos/Address";
import { OrganizationInfos } from "../../components/Infos/Organizations";
import { Organizations } from "../../pages/organization/[slug]";

export default function OrganizationData({ organization }: Organizations) {
  return (
    <>
      {organization ? (
        <>
          <Flex
            w="100%"
            my="6"
            maxWidth={1480}
            mx="auto"
            px="6"
            direction="column"
          >
            <Slide imagesUrl={organization?.images_url} />
            <OrganizationInfos data={organization} />
            <AddressData data={organization?.address} />
            <ListProjects data={organization?.projects} />
            <ListDonations data={organization?.donations} />
            <Box w={1160} mt={20} mx="auto" fontSize="lg">
              <Divider mt="20px" />
              <Text mt={5}>Responsáveis pela organização</Text>

              {organization?.responsibles?.map((responsible) => (
                <ProfileAvatar key={responsible.user_id} data={responsible} />
              ))}
            </Box>
          </Flex>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
