import { Box, Divider, Flex, Text, useBreakpointValue } from "@chakra-ui/react";

import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { api } from "../services/apiCLient";
import { withSSRAuth } from "../utils/withSSRAuth";
import { setupApiClient } from "../services/api";
import { User } from "../@types/user";
import { Volunteer } from "../@types/volunteer";
import { Project } from "../@types/project";
import { Organization } from "../@types/organization";
import { UserData } from "../components/Infos/User";
import { VolunteerData } from "../components/Infos/Volunteer";
import { ListProjects } from "../components/ListProjects";
import { OrganizationInfos } from "../components/Infos/Organizations";
import { OrganizationStatusWait } from "../components/Infos/OrganizationStatusWait";
import { OrganizationStatusInactive } from "../components/Infos/OrganizationStatusInactive";

interface ProfileProps {
  user: User;
  volunteer?: Volunteer;
  project?: Project[];
  organization?: Organization;
}

interface Profile {
  profile: ProfileProps;
}

export default function Profile({ profile }: Profile) {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
  if (profile) {
    const { user, volunteer, project, organization } = profile[0];

    const organizationProps = () => {
      if (organization?.status === 1) {
        return (
          <OrganizationInfos data={organization} hasVisitButton isProfile />
        );
      } else if (organization?.status === 2) {
        <OrganizationStatusInactive isProfile />;
      } else if (organization?.status === 3) {
        return <OrganizationStatusWait isProfile />;
      }
    };
    return (
      <Box w="100%" minW={1440}>
        <Header />
        {user ? (
          <>
            <Flex w="100%" maxWidth={1480} ml="auto" px="6">
              <Flex direction="column">
                <UserData data={user} isProfile />
                {volunteer && <VolunteerData data={volunteer} isProfile />}
                {project && <ListProjects data={project} />}

                {organization && (
                  <Box w={1160} mt={20} mx="auto" fontSize="lg">
                    <Divider mt="20px" />
                    <Text mt={5}>
                      Conheça a organização que sou responsavél
                    </Text>
                    {organizationProps}
                  </Box>
                )}
              </Flex>
            </Flex>
          </>
        ) : (
          <Loading />
        )}
      </Box>
    );
  } else {
    return <Loading />;
  }
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiCLient = setupApiClient(ctx);

  let user: User;
  let volunteer: Volunteer;
  let project: Project[];
  let organization: Organization;

  await apiCLient.get<User>(`/users/profile`).then((response) => {
    user = response.data;
  });

  if (user?.is_volunteer) {
    await api
      .get<Volunteer>(`/volunteers/find/?id=${user.id}`)
      .then((response) => {
        volunteer = response.data;
      });

    console.log(volunteer);

    await api
      .get<Project[]>(`/subscriptions/user/?id=${volunteer.id}`)
      .then((response) => {
        project = response.data;
      });

    console.log(project);
  } else {
    await api
      .get<Organization>(`/organizations/user/?id=${user.id}`)
      .then((response) => {
        organization = response.data;
      });
  }

  const profile = [
    {
      user,
      volunteer: volunteer || null,
      project: project || null,
      organization: organization || null,
    },
  ];
  console.log(profile);
  return {
    props: { profile },
  };
});
