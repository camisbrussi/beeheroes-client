import { Box, Divider, Flex, Text } from "@chakra-ui/react";

import { ListDonations } from "../Lists/DonationsOrganizationsList";

import { Loading } from "../../components/Loading";
import { ProfileAvatar } from "../../components/ProfileAvatar";
import { Slide } from "../../components/Slide";
import { OrganizationInfos } from "../../components/Infos/Organizations";
import { ListProjects } from "../Lists/ProjectsOrganizationList";

export default function OrganizationData({
  organization,
  isResponsible = null,
}) {
  console.log(organization?.project);
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
            <OrganizationInfos
              data={organization}
              isResponsible={isResponsible}
            />
            <Box mt={10}>
              {organization?.images_url.length ? (
                <Slide imagesUrl={organization?.images_url} />
              ) : (
                ""
              )}
            </Box>

            <ListProjects
              data={organization?.projects}
              organizationId={organization.id}
              isResponsible={isResponsible}
            />

            <ListDonations
              data={organization?.donations}
              organizationId={organization.id}
              isResponsible={isResponsible}
            />
            <Box w={1160} mt={20} mx="auto" fontSize="lg">
              <Divider mt="20px" borderColor="blue.600" />
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
