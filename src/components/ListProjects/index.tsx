import { HStack, Text, Box, Divider } from "@chakra-ui/react";
import { Card } from "./Card";

interface ListProjectsProps {
  data: ProjectProps[];
}

export type ProjectProps = {
  id: string;
  name: string;
  start: string;
  end?: string;
  vacancies?: number;
  status?: boolean;
};

export function ListProjects({ data }: ListProjectsProps) {
  return (
    <Box w={1160} mt={20} mx="auto" fontSize="lg">
      <Divider />
      <Text mt={5}>Projetos em andamento</Text>
      <HStack spacing="20" align="left" w={1160} mt={10} mx="auto">
        {data?.map((project) => (
          <Card key={project.id} data={project} />
        ))}
      </HStack>
    </Box>
  );
}
