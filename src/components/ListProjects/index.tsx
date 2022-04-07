import { HStack, Text, Box, Divider, Link, Tag, Flex } from "@chakra-ui/react";
import { Project } from "../../@types/project";
import { Card } from "./Card";

interface ListProjectsProps {
  data: Project[];
  isResponsible?: boolean;
  organizationId?: string;
}

export function ListProjects({
  data,
  isResponsible,
  organizationId,
}: ListProjectsProps) {
  return (
    <Box w={1160} mt={20} mx="auto" fontSize="lg">
      <Divider />
      <Flex>
        <Text mt={8}>Projetos em andamento</Text>
        {isResponsible && (
          <Link href={`/project/register/${organizationId}`}>
            <Tag mt={8} ml={3} colorScheme="yellow">
              Adicionar Projeto
            </Tag>
          </Link>
        )}
      </Flex>
      <HStack spacing="20" align="left" w={1160} mt={10} mx="auto">
        {data?.map((project) => (
          <Card key={project.id} data={project} />
        ))}
      </HStack>
    </Box>
  );
}
