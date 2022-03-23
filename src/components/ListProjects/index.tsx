import { HStack, Text, Box, Divider } from "@chakra-ui/react";
import { Card } from "./Card";

export interface ListCardProjectsProps {
  id: string;
  name: string;
  start: string;
  end?: string;
  vacations?: number;
}
interface ListProjectsProps {
  data: ListCardProjectsProps[];
}

export function ListProjects({ data }: ListProjectsProps) {
  return (
    <Box w={1160} mt={20} mx="auto" fontSize="lg">
      <Divider />
      <Text mt={5}>Projetos em andamento</Text>
      <HStack spacing="20" align="left" w={1160} mt={10} mx="auto">
        {data?.map((project) => (
          <Card
            name={project.name}
            id={project.id}
            key={project.id}
            start={project.start}
            end={project.end}
            vacations={project.vacations}
          />
        ))}
      </HStack>
    </Box>
  );
}
