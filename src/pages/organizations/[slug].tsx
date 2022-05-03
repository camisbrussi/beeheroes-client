import { Box, Flex } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";

import { Header } from "../../components/Header";

import { api } from "../../services/apiCLient";
import { OrganizationProps } from "../../@types/organization";
import OrganizationStatusActive from "../../components/Infos/OrganizationStatusActive";
import { OrganizationStatusInactive } from "../../components/Infos/OrganizationStatusInactive";
import { OrganizationStatusWait } from "../../components/Infos/OrganizationStatusWait";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export interface Organizations {
  organization: OrganizationProps;
}

export default function OrganizationData({ organization }: Organizations) {
  const [isResponsible, setIsResponsible] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    organization?.responsibles?.map((responsible) => {
      responsible?.user_id === user?.id && setIsResponsible(true);
    });
  }, [organization, user]);

  const organizationProps = () => {
    if (organization?.status === 1) {
      return (
        <OrganizationStatusActive
          organization={organization}
          isResponsible={isResponsible}
        />
      );
    } else if (organization?.status === 2) {
      <OrganizationStatusInactive />;
    } else if (organization?.status === 3) {
      return (
        <OrganizationStatusWait
          organization={organization}
          isResponsible={isResponsible}
        />
      );
    }
  };

  return (
    <Box w="100%">
      <Header />
      <Flex mt={20}>{organizationProps()}</Flex>
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
    revalidate: 60,
  };
};
