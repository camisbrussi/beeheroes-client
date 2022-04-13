import { Box, Image, SimpleGrid, useBreakpointValue } from "@chakra-ui/react";
import { CardProject } from "../Cards/CardProject";
import customDataStatus from "../../utils/status.json";

export function ProjectList({ items }) {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Box maxW="1240" h="100%" px={["4", "10"]}>
      <SimpleGrid
        p={6}
        columns={[2, 3]}
        spacingX="40px"
        spacingY="30px"
        minChildWidth={isWideVersion ? "300px" : "150px"}
      >
        {items?.map((item) => (
          <CardProject
            key={item.id}
            data={item}
            status={customDataStatus.project[item.status]}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}
