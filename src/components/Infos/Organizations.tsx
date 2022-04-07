import { HStack, Stack, Text, Image, Tag, Link, Flex } from "@chakra-ui/react";
import { OrganizationProps } from "../../@types/organization";
interface InfoOrganizationProps {
  hasVisitButton?: boolean;
  data: OrganizationProps;
  isResponsible?: boolean;
}

export function OrganizationInfos({
  hasVisitButton = null,
  data,
  isResponsible = null,
}: InfoOrganizationProps) {
  const slug = data?.id;
  return (
    <HStack spacing="20" justify="space-between" w={1160} mt={5} mx="auto">
      <Stack>
        <Text fontSize="5xl">
          {data?.name}
          {hasVisitButton && (
            <Link href={`/organization/${slug}`}>
              <Tag mt={8} ml={3} colorScheme="yellow">
                Visitar Perfil
              </Tag>
            </Link>
          )}
          <Text fontSize="md">({data?.organization_type?.name}) </Text>
        </Text>

        <Text fontSize="lg">{data?.description}</Text>

        <Text fontSize="md">E-mail: {data?.email}</Text>
        {data?.address?.city && (
          <Text>
            {data?.address?.city.name}/{data?.address?.city?.state?.uf}
          </Text>
        )}
        <Flex justify="center">
          {isResponsible && (
            <Link href={`/organization/edit/${data?.id}`}>
              <Tag mt={8} ml={3} colorScheme="yellow">
                Editar dados
              </Tag>
            </Link>
          )}
        </Flex>
      </Stack>

      <Image
        ml="10px"
        boxSize="250px"
        objectFit="cover"
        borderRadius="10"
        src={
          data?.avatar
            ? `${process.env.NEXT_PUBLIC_AWS_BUCKET_URL}/avatar/${data?.avatar}`
            : "/images/responsible.svg"
        }
        alt={data?.name}
      />
    </HStack>
  );
}
