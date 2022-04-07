import {
  Box,
  Center,
  Flex,
  HStack,
  Image,
  SimpleGrid,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Card } from "./Card";

export function SearchTypes() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
  return (
    <SimpleGrid
      minChildWidth={isWideVersion ? "100px" : "100px"}
      spacingY={isWideVersion ? "40px" : "30px"}
      spacingX={isWideVersion ? "40px" : "110px"}
      ml={isWideVersion ? "40" : "75"}
      mt={isWideVersion ? "10" : "60"}
    >
      <Card
        title="Organizações"
        image="/images/organization.svg"
        slug="organizations"
      />
      <Card title="Projetos" image="/images/project.svg" slug="projects" />
      <Card title="Doações" image="/images/donation.svg" slug="donations" />
      <Card title="Voluntários" image="/images/logo.svg" slug="volunteers" />
    </SimpleGrid>
  );
}
