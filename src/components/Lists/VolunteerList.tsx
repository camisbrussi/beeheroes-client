import { Box, Grid, useBreakpointValue } from "@chakra-ui/react";
import { CardVolunteer } from "../Cards/CardVolunteer";

export function VolunteerList({ items }) {
  return (
    <Box maxW="1240" h="100%" px={["4", "10"]}>
      <Grid templateColumns="repeat(4, 1fr)" gap={10} mt={10}>
        {items?.map((item) => (
          <CardVolunteer key={item.id} item={item} slug="volunteer" />
        ))}
      </Grid>
    </Box>
  );
}
