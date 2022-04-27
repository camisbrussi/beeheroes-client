import {
  Box,
  Flex,
  Grid,
  HStack,
  SimpleGrid,
  Stack,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import { CardOrganization } from "../Cards/CardOrganization";

export function OrganizationList({ items }) {
  return (
    <Box maxW="1240" h="100%" px={["4", "10"]}>
      <Grid templateColumns="repeat(4, 1fr)" gap={10} mt={10}>
        {items?.map((item) => (
          <CardOrganization key={item.id} item={item} slug="organizations" />
        ))}
      </Grid>
    </Box>
  );
}
