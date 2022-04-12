import { SimpleGrid, useBreakpointValue } from "@chakra-ui/react";
import { Card } from "./Card";

export function SearchTypes() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
  return (
    <SimpleGrid
      minChildWidth="100px"
      spacingY={isWideVersion ? "40px" : "30px"}
      spacingX={isWideVersion ? "40px" : "110px"}
      mt={isWideVersion ? "20" : "60"}
      ml={100}
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
