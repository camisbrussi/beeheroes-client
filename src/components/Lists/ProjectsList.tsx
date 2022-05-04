import { Box, Grid } from "@chakra-ui/react";
import { CardProject } from "../Cards/CardProject";
import customDataStatus from "../../utils/status.json";

export function ProjectList({ items }) {
  return (
    <Box maxW="1240" h="100%" px={["4", "10"]}>
      <Grid templateColumns="repeat(3, 1fr)" gap={10} mt={10}>
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
