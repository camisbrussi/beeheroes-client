import { Box, Divider, Text } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";

import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { InfoUser, User } from "../../components/Infos/infoUser";
import { InfoVolunteer, Volunteer } from "../../components/Infos/infoVolunteer";
import { Loading } from "../../components/Loading";
import { api } from "../../services/apiCLient";
import { ListProjects, ProjectProps } from "../../components/ListProjects";
import {
  InfoOrganization,
  OrganizationInfo,
} from "../../components/Infos/infoOrganizations";

interface ProfileProps {
  user: User;
  volunteer?: Volunteer;
  project?: ProjectProps[];
  organization?: OrganizationInfo;
}

export default function Profile({
  user,
  volunteer,
  project,
  organization,
}: ProfileProps) {
  return (
    <Box w="100%" minW={1440}>
      <Header hasBackButton />
      {user ? (
        <>
          <InfoUser data={user} />
          {volunteer && <InfoVolunteer data={volunteer} />}
          {project && <ListProjects data={project} />}

          {organization && (
            <Box w={1160} mt={20} mx="auto" fontSize="lg">
              <Divider mt="20px" />
              <Text mt={5}>Conheça a organização que sou responsavél</Text>

              <InfoOrganization data={organization} hasVisitButton />
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

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let user: User;
  let volunteer: Volunteer;
  let project: ProjectProps[];
  let organization: OrganizationInfo;

  const { slug } = params;

  await api.get<User>(`/users/find/?id=${slug}`).then((response) => {
    user = response.data;
  });

  if (user?.is_volunteer) {
    await api
      .get<Volunteer>(`/volunteers/find/?id=${slug}`)
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
      .get<OrganizationInfo>(`/organizations/user/?id=${slug}`)
      .then((response) => {
        organization = response.data;
      });
  }

  return {
    props: {
      user,
      volunteer: volunteer || null,
      project: project || null,
      organization: organization || null,
    },
    revalidate: 60 * 60, // 1 hour,
  };
};
