import { HStack, Image } from "@chakra-ui/react";
import { Card } from "./Card";

export function SearchTypes() {
  return (
    <HStack spacing="20" align="left" w={1160} mt={20} mx="auto">
      <Card
        title="Busca por organização"
        image="/images/organization.svg"
        slug="organizations"
      />
      <Card
        title="Busca por projetos"
        image="/images/project.svg"
        slug="projects"
      />
      <Card
        title="Busca por doações"
        image="/images/donation.svg"
        slug="donations"
      />
      <Card
        title="Busca por voluntários"
        image="/images/logo.svg"
        slug="volunteers"
      />
    </HStack>
  );
}
