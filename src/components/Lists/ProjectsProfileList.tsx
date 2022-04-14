import {
  Text,
  Box,
  Divider,
  Flex,
  SimpleGrid,
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
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
  return (
    <Box w="100%" mt={20} fontSize="lg">
      <Divider borderColor="blue.600" />
      <Flex>
        <Text mt={8}>Lista de projetos</Text>
      </Flex>
      <Box>
        <SimpleGrid
          p={6}
          columns={[2, 3]}
          spacingX="40px"
          spacingY="30px"
          minChildWidth={isWideVersion ? "300px" : "150px"}
        >
          {data?.map((project) => (
            <CardProject
              key={project.id}
              data={project}
              status={
                customDataStatus.subscription[project.status_subscription]
              }
            />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
