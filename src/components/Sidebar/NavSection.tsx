import { Box, Stack, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

interface NavSectionProps {
  title: string;
  children: ReactNode;
}

export function NavSection({ title, children }: NavSectionProps) {
  return (
    <Box>
      <Text fontWeight="bold" color="brown.600" fontSize="small">
        {title}
      </Text>
      <Stack spacing="2" mt="4" align="stretch">
        {children}
      </Stack>
    </Box>
  );
}
