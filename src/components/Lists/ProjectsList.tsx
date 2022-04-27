import { Box, Grid, useBreakpointValue } from "@chakra-ui/react";
import { CardProject } from "../Cards/CardProject";
import customDataStatus from "../../utils/status.json";

export function ProjectList({ items }) {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Box maxW="1240" h="100%" px={["4", "10"]}>
      <Grid templateColumns="repeat(5, 1fr)" gap={10} mt={10}>
        {items?.map((item) => (
          <CardProject
            key={item.id}
            data={item}
            status={customDataStatus.project[item.status]}
          />
        ))}
      </Grid>
    </Box>
  );
}
