import {
  Text,
  Box,
  Divider,
  Flex,
  Grid,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ProjectListProps } from "../../@types/project";
import customDataStatus from "../../utils/status.json";
import { CardProject } from "../Cards/CardProject";

interface ListProjectsProps {
  data: ProjectListProps[];
  isResponsible?: boolean;
  organizationId?: string;
  isProfile?: boolean;
}

export function ListProjectsProfile({ data }: ListProjectsProps) {
  return (
    <Box w="100%" mt={20} fontSize="lg">
      <Divider borderColor="blue.600" />
      <Flex>
        <Text mt={8}>Lista de projetos</Text>
      </Flex>
      <Box>
        <Grid templateColumns="repeat(3, 1fr)" gap={10} mt={10}>
          {data?.map((project) => (
            <CardProject
              key={project.id}
              data={project}
              status={
                customDataStatus.subscription[project.status_subscription]
              }
            />
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
