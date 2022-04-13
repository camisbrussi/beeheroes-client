import {
  Text,
  Box,
  Divider,
  Link,
  Tag,
  Flex,
  SimpleGrid,
} from "@chakra-ui/react";
import { ProjectList } from "../../@types/project";

import customDataStatus from "../../utils/status.json";
import { CardProject } from "../Cards/CardProject";

interface ListProjectsProps {
  data: ProjectList[];
  isResponsible?: boolean;
  organizationId?: string;
  isProfile?: boolean;
}

export function ListProjects({
  data,
  isResponsible,
  organizationId,
}: ListProjectsProps) {
  return (
    <Box w={1160} mt={20} mx="auto" fontSize="lg">
      <Divider borderColor="blue.600" />
      <Flex>
        <Text mt={8}>Lista de projetos</Text>

        <Link href={`/projects/busca?&organization_id=${organizationId}`}>
          <Tag mt={8} ml={3} colorScheme="yellow">
            Ver Todos
          </Tag>
        </Link>

        {isResponsible && (
          <Link href={`/project/register/${organizationId}`}>
            <Tag mt={8} ml={3} colorScheme="yellow">
              Adicionar Projeto
            </Tag>
          </Link>
        )}
      </Flex>
      <SimpleGrid
        p={6}
        columns={[2, 3]}
        spacing={[5, 10]}
        my={["5", "5"]}
        minChildWidth="150px"
      >
        {data?.map((project) => (
          <CardProject
            key={project.id}
            data={project}
            status={customDataStatus.project[project.status]}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}
