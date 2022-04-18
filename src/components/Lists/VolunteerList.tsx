import { Box, Image, SimpleGrid, useBreakpointValue } from "@chakra-ui/react";
import { CardOrganization } from "../Cards/CardOrganization";

export function VolunteerList({ items }) {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Box maxW="1240" h="100%" px={["4", "10"]}>
      <SimpleGrid
        columns={[2, 4]}
        spacing={[5, 10]}
        my={["5", "5"]}
        minChildWidth={isWideVersion ? "250px" : "150px"}
      >
        {items?.map((item) => (
          <CardOrganization key={item.id} item={item} slug="volunteer" />
        ))}
      </SimpleGrid>
    </Box>
  );
}