import {
  Box,
  Text,
  Image,
  HStack,
  Stack,
  Divider,
  Flex,
  Icon,
  Modal,
  useDisclosure,
  Link,
  Tag,
  SimpleGrid,
} from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import { AiOutlineCalendar, AiOutlineExclamationCircle } from "react-icons/ai";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import Router from "next/router";

import { Header } from "../../components/Header";
import { api } from "../../services/apiCLient";
import { Button } from "../../components/Button";

import { Loading } from "../../components/Loading";
import { Project } from "../../@types/project";
import { Subscription } from "../../@types/subscriptions";
import { OrganizationInfos } from "../../components/Infos/Organizations";
import { ProfileAvatar } from "../../components/ProfileAvatar";
import { SubscriptionModal } from "../../components/modais/SubscriptionModal";
import { AuthContext } from "../../context/AuthContext";
import { OrganizationProps } from "../../@types/organization";

interface ProjectProps {
  project: Project;
  subscriptions: Subscription[];
  organization: OrganizationProps;
}

export default function User({
  project,
  subscriptions,
  organization,
}: ProjectProps) {
  const [isResponsible, setIsResponsible] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    organization?.responsibles?.map((responsible) => {
      responsible?.user_id === user?.id && setIsResponsible(true);
    });
  }, [organization, user]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const startDate = moment(project?.start).format("DD/MM/YYYY, h:mm");
  const endDate = moment(project?.end).format("DD/MM/YYYY, h:mm");

  const projectFree = project?.vacancies === 0 && true;

  return (
    <Box w="100%" minW={1440}>
      <Header />
      {project ? (
        <>
          <HStack
            spacing="20"
            justify="space-between"
            w={1160}
            mt={20}
            mx="auto"
          >
            <Stack>
              <Text as="h1" fontSize="5xl">
                {project?.name}
              </Text>

              <Text fontSize="lg">{project?.description}</Text>
              <Flex align="center">
                <Icon as={AiOutlineCalendar} mx="2" color="green" />
                <Text fontSize="md">{startDate}</Text>
                <Text fontSize="xs" ml="1">
                  (Início)
                </Text>
              </Flex>
              {endDate && (
                <Flex align="center" mt="2">
                  <Icon as={AiOutlineCalendar} mx="2" color="red" />
                  <Text fontSize="md">{endDate}</Text>
                  <Text fontSize="xs" ml="1">
                    (Fim)
                  </Text>
                </Flex>
              )}
              <Flex align="center" mt="2" mb="20">
                {project?.vacancies ? (
                  <Text fontSize="md">
                    {project?.total_subscription < project?.vacancies ? (
                      <Icon
                        as={AiOutlineExclamationCircle}
                        mx="2"
                        color="green"
                      />
                    ) : (
                      <Icon
                        as={AiOutlineExclamationCircle}
                        mx="2"
                        color="red"
                      />
                    )}
                    {project?.total_subscription}/{project?.vacancies} Vagas
                    Preenchidas
                  </Text>
                ) : (
                  <Text fontSize="md">
                    <Icon
                      as={AiOutlineExclamationCircle}
                      mx="2"
                      color="green"
                    />
                    Entrada Livre
                  </Text>
                )}
              </Flex>

              {isResponsible ? (
                <Flex justify="center">
                  <Link href={`/projects/edit/${project?.id}`}>
                    <Tag mt={8} ml={3} colorScheme="yellow">
                      Editar dados
                    </Tag>
                  </Link>
                </Flex>
              ) : (
                (project?.total_subscription !== project?.vacancies ||
                  projectFree) && (
                  <Button
                    title="Fazer Inscrição"
                    onClick={user ? onOpen : () => Router.push("/signin")}
                  />
                )
              )}
            </Stack>
            <Image
              ml="10px"
              objectFit="cover"
              borderRadius="10"
              src="/images/workbee.svg"
              alt="Desenho de uma abelha carregando mel em seu carrinho"
            />
          </HStack>

          <Box w={1160} mt={20} mx="auto" fontSize="lg">
            <Divider mt="20px" borderColor="blue.600" />
            <Text mt={5}>Organização Responsável pelo evento</Text>

            <OrganizationInfos data={organization} hasVisitButton />
          </Box>

          <Box w={1160} mt={20} mx="auto" fontSize="lg">
            <Divider mt="20px" borderColor="blue.600" />
            <Text mt={5}>Voluntários inscritos no projeto</Text>
            <SimpleGrid minChildWidth="180px" spacing="2px">
              {subscriptions?.map((subscription) => (
                <ProfileAvatar
                  key={subscription.id}
                  data={subscription.volunteer}
                  isProject
                  statusSubscriptions={subscription.status}
                />
              ))}
            </SimpleGrid>
            <Flex mt={5} mb={5}>
              <Text>Legenda:</Text>
              <Flex ml={2}>
                <Box borderRadius="full" bg="green" px={2} h={4} m={1} />
                <Text>Ativa</Text>
              </Flex>
              <Flex ml={2}>
                <Box borderRadius="full" bg="blue" px={2} h={4} m={1} />
                <Text>Realizada</Text>
              </Flex>
              <Flex ml={2}>
                <Box borderRadius="full" bg="orange" px={2} h={4} m={1} />
                <Text>Suspensa</Text>
              </Flex>
              <Flex ml={2}>
                <Box borderRadius="full" bg="tomato" px={2} h={4} m={1} />
                <Text>Não Compareceu</Text>
              </Flex>
              <Flex ml={2}>
                <Box borderRadius="full" bg="yellow" px={2} h={4} m={1} />
                <Text>Aguardando Autorização</Text>
              </Flex>
            </Flex>
          </Box>
        </>
      ) : (
        <Loading />
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <SubscriptionModal
          projectId={project?.id}
          userId={user?.id}
          onCloseModal={onClose}
        />
      </Modal>
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
  let project: Project;
  let subscriptions: Subscription[];
  let organization: OrganizationProps;

  const { slug } = params;

  await api.get<Project>(`/projects/find/?id=${slug}`).then((response) => {
    project = response.data;
  });

  await api
    .get<OrganizationProps>(
      `/organizations/find/?id=${project.organization_id}`
    )
    .then((response) => {
      organization = response.data;
    });

  await api
    .get<Subscription[]>(`/subscriptions/project/?id=${project.id}`)
    .then((response) => {
      subscriptions = response.data;
    });

  return {
    props: {
      project,
      subscriptions,
      organization,
    },
    revalidate: 60 * 60, // 1 hour,
  };
};
