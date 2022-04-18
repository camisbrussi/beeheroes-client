import {
  Text,
  Box,
  Divider,
  Link,
  Tag,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ProjectListProps } from "../../@types/project";

import { ProjectList } from "./ProjectsList";

interface ListProjectsProps {
  data: ProjectListProps[];
  isResponsible?: boolean;
  organizationId?: string;
  isProfile?: boolean;
}

export function ListProjects({
  data,
  isResponsible,
  organizationId,
}: ListProjectsProps) {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
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
      <ProjectList items={data} />
    </Box>
  );
}