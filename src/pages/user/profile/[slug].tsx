import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";

import { Organization } from "../../../@types/organization";
import { Project } from "../../../@types/project";
import { User } from "../../../@types/user";
import { Volunteer } from "../../../@types/volunteer";
import { Header } from "../../../components/Header";
import { OrganizationInfos } from "../../../components/Infos/Organizations";
import { OrganizationStatusInactive } from "../../../components/Infos/OrganizationStatusInactive";
import { OrganizationStatusWait } from "../../../components/Infos/OrganizationStatusWait";
import { UserData } from "../../../components/Infos/User";
import { VolunteerData } from "../../../components/Infos/Volunteer";
import { ListProjects } from "../../../components/ListProjects";
import { Loading } from "../../../components/Loading";
import { api } from "../../../services/apiCLient";

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
  if (profile) {
    const { user, volunteer, project, organization } = profile[0];

    const organizationProps = () => {
      if (organization.status === 1) {
        return (
          <OrganizationInfos data={organization} hasVisitButton isProfile />
        );
      } else if (organization.status === 2) {
        <OrganizationStatusInactive />;
      } else if (organization.status === 3) {
        return <OrganizationStatusWait />;
      }
    };
    return (
      <Box w="100%" minW={1440}>
        <Header />

        {user ? (
          <>
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
              <Flex direction="column">
                <UserData data={user} />
                {volunteer && <VolunteerData data={volunteer} />}
                {project && <ListProjects data={project} />}

                {organization && (
                  <Box w={1160} mt={5} mx="auto" fontSize="lg">
                    <Text mt={5}>
                      Conheça a organização que sou responsavél
                    </Text>

                    {organizationProps()}
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

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  let user: User;
  let volunteer: Volunteer;
  let project: Project[];
  let organization: Organization;

  await api.get<User>(`/users/find?id=${slug}`).then((response) => {
    user = response.data;
  });

  if (user?.is_volunteer) {
    await api
      .get<Volunteer>(`/volunteers/find/?id=${user.id}`)
      .then((response) => {
        volunteer = response.data;
      });

    await api
      .get<Project[]>(`/subscriptions/user/?id=${volunteer.id}`)
      .then((response) => {
        project = response.data;
      });
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

  return {
    props: { profile: profile || [] },
    revalidate: 60 * 60, // 1 hour,
  };
};
