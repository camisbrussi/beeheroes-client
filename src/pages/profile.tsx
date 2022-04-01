import { Box, Divider, Text } from "@chakra-ui/react";

import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { User, InfoUser } from "../components/Infos/User";
import { Volunteer, InfoVolunteer } from "../components/Infos/Volunteer";
import { Loading } from "../components/Loading";
import { api } from "../services/apiCLient";
import { ListProjects, ProjectProps } from "../components/ListProjects";
import {
  Organization,
  InfoOrganization,
} from "../components/Infos/Organizations";
import { withSSRAuth } from "../utils/withSSRAuth";
import { setupApiClient } from "../services/api";

interface ProfileProps {
  user: InfoUser;
  volunteer?: InfoVolunteer;
  project?: ProjectProps[];
  organization?: InfoOrganization;
}

interface Profile {
  profile: ProfileProps;
}

export default function Profile({ profile }: Profile) {
  const { user, volunteer, project, organization } = profile[0];
  return (
    <Box w="100%" minW={1440}>
      <Header hasBackButton />
      {user ? (
        <>
          <User data={user} />
          {volunteer && <Volunteer data={volunteer} />}
          {project && <ListProjects data={project} />}

          {organization && (
            <Box w={1160} mt={20} mx="auto" fontSize="lg">
              <Divider mt="20px" />
              <Text mt={5}>Conheça a organização que sou responsavél</Text>

              <Organization data={organization} hasVisitButton />
            </Box>
          )}

          <Footer />
        </>
      ) : (
        <Loading />
      )}
    </Box>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiCLient = setupApiClient(ctx);

  let user: InfoUser;
  let volunteer: InfoVolunteer;
  let project: ProjectProps[];
  let organization: InfoOrganization;

  await apiCLient.get<InfoUser>(`/users/profile`).then((response) => {
    user = response.data;
  });

  if (user?.is_volunteer) {
    await api
      .get<InfoVolunteer>(`/volunteers/find/?id=${user.id}`)
      .then((response) => {
        volunteer = response.data;
      });

    await api
      .get<ProjectProps[]>(`/subscriptions/user/?id=${volunteer.id}`)
      .then((response) => {
        project = response.data;
      });
  } else {
    await api
      .get<InfoOrganization>(`/organizations/user/?id=${user.id}`)
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
  return {
    props: { profile },
  };
});
