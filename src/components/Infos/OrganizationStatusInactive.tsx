import { HStack, Stack, Text, Image } from "@chakra-ui/react";

export function OrganizationStatusInactive({ isResponsible = null }) {
  return (
    <HStack spacing="20" justify="space-between" w={1160} mx="auto">
      <Stack>
        {isResponsible ? (
          <>
            <Text fontSize="6xl">Até logo!</Text>
            <Text>Sua organização foi inativada!</Text>
          </>
        ) : (
          <>
            <Text fontSize="6xl">Organização Desativada!</Text>
            <Text>O cadastro da organização foi desativado</Text>
          </>
        )}
      </Stack>
      <Image
        ml="20px"
        htmlWidth={300}
        objectFit="cover"
        borderRadius="10"
        src="/images/responsible.svg"
        alt="desenho de uma abelha"
      />
    </HStack>
  );
}
