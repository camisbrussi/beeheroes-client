import { HStack, Stack, Text, Image, Tag, Link } from "@chakra-ui/react";

interface InfoOrganizationProps {
  hasVisitButton?: boolean;
  data: InfoOrganization;
}

export type InfoOrganization = {
  id?: string;
  name: string;
  description: string;
  email: string;
  cnpj: string;
  avatar_url: string;
  organization_type: organizationType;
  address: {
    city: string;
    uf: string;
  };
};

type organizationType = {
  name: string;
  description: string;
};

export function Organization({ hasVisitButton, data }: InfoOrganizationProps) {
  const slug = data?.id;
  return (
    <HStack spacing="20" justify="space-between" w={1160} mt={5} mx="auto">
      <Stack>
        <Text fontSize="5xl">
          {data?.name}{" "}
          {hasVisitButton && (
            <Link href={`/organization/${slug}`}>
              {" "}
              <Tag mt={8}> Visitar Perfil </Tag>{" "}
            </Link>
          )}
          <Text fontSize="md">({data?.organization_type?.name}) </Text>
        </Text>

        <Text fontSize="lg">{data?.description}</Text>

        <Text fontSize="md">E-mail: {data?.email}</Text>
        {data?.address?.city && (
          <Text>
            {data?.address?.city}/{data?.address?.uf}
          </Text>
        )}
      </Stack>

      <Image
        ml="10px"
        boxSize="250px"
        objectFit="cover"
        borderRadius="10"
        src={data?.avatar_url ? data?.avatar_url : "/images/responsible.svg"}
        alt={data?.name}
      />
    </HStack>
  );
}
