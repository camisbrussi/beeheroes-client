import { Box, Image, SimpleGrid, useBreakpointValue } from "@chakra-ui/react";
import customDataStatus from "../../utils/status.json";
import { CardDonation } from "../Cards/CardDonation";

export function DonationList({ items }) {
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
          <CardDonation
            key={item.id}
            data={item}
            status={customDataStatus.project[item.status]}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}
