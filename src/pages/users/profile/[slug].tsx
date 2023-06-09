import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import { hotjar } from "react-hotjar";

import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Evaluation } from "../../../@types/evaluation";
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
import { ListProjectsProfile } from "../../../components/Lists/ProjectsProfileList";
import { Loading } from "../../../components/Loading";
import { AuthContext } from "../../../context/AuthContext";
import { api } from "../../../services/apiCLient";
import { withSSRGuest } from "../../../utils/withSSRGuest";

interface ProfileProps {
  user: User;
  volunteer?: Volunteer;
  project?: Project[];
  organization?: Organization;
  evaluations?: Evaluation[];
}

interface Profile {
  profile: ProfileProps;
  slug: string;
}

export default function Profile({ profile, slug }: Profile) {
  useLayoutEffect(() => {
    hotjar.initialize(2953049, 6);

    hotjar.event("button-click");
  }, []);

  const [isProfile, setIsProfile] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    slug && slug === user?.id && setIsProfile(true);
  }, [slug, user]);

  if (profile) {
    const { userData, volunteer, project, organization, evaluations } =
      profile[0];

    const organizationProps = () => {
      if (organization.status === 1) {
        return (
          <OrganizationInfos
            data={organization}
            hasVisitButton
            isResponsible={isProfile}
          />
        );
      } else if (organization.status === 2) {
        return <OrganizationStatusInactive isResponsible={isProfile} />;
      } else if (organization.status === 3) {
        return (
          <OrganizationStatusWait
            organization={organization}
            isResponsible={isProfile}
          />
        );
      }
    };
    return (
      <Box w="100%" pb={10}>
        <Header />

        {profile ? (
          <>
            <Flex maxWidth={1480} m="auto" justify="center">
              <Flex direction="column">
                <UserData data={userData} />
                {volunteer && (
                  <VolunteerData
                    data={volunteer}
                    evaluations={evaluations}
                    isProfile={isProfile}
                  />
                )}
                {project && <ListProjectsProfile data={project} />}

                {organization && (
                  <Box w={1160} mt={5} mx="auto" fontSize="lg">
                    <Divider mt={9} borderColor="blue.600" />
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

export const getServerSideProps = withSSRGuest(async (ctx) => {
  const { slug } = ctx.params;

  let userData: User;
  let volunteer: Volunteer;
  let project: Project[];
  let organization: Organization;
  let evaluations: Evaluation[];

  await api.get<User>(`/users/find?id=${slug}`).then((response) => {
    userData = response.data;
  });

  if (userData?.is_volunteer) {
    await api
      .get<Volunteer>(`/volunteers/find/?id=${userData.id}`)
      .then((response) => {
        volunteer = response.data;
      });

    await api
      .get<Project[]>(`/subscriptions/user/?id=${volunteer.id}`)
      .then((response) => {
        project = response.data;
      });

    await api
      .get<Evaluation[]>(`/evaluations/user/?id=${userData.id}`)
      .then((response) => {
        evaluations = response.data;
      });
  } else {
    await api
      .get<Organization>(`/organizations/user/?id=${userData.id}`)
      .then((response) => {
        organization = response.data;
      });
  }

  const profile = [
    {
      userData,
      volunteer: volunteer || null,
      project: project || null,
      organization: organization || null,
      evaluations: evaluations || null,
    },
  ];

  return {
    props: { profile: profile || [], slug },
  };
});
