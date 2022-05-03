import { Box, Grid } from "@chakra-ui/react";
import customDataStatus from "../../utils/status.json";
import { CardDonation } from "../Cards/CardDonation";

export function DonationList({ items }) {
  return (
    <Box maxW="1240" h="100%" px={["4", "10"]}>
      <Grid templateColumns="repeat(5, 1fr)" gap={10} mt={10}>
        {items?.map((item) => (
          <CardDonation
            key={item.id}
            data={item}
            status={customDataStatus.project[item.status]}
          />
        ))}
      </Grid>
    </Box>
  );
}
