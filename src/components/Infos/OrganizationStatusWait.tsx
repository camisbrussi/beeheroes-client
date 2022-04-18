import { HStack, Stack, Text, Image, Tag, Link } from "@chakra-ui/react";

export function OrganizationStatusWait({ organization, isResponsible = null }) {
  return (
    <HStack spacing="20" justify="space-between" w={1160} mx="auto">
      <Stack>
        {isResponsible ? (
          <>
            <Link href={`/organizations/edit/${organization?.id}`}>
              <Tag mt={8} ml={3} colorScheme="yellow">
                Editar dados
              </Tag>
            </Link>
            <Text fontSize="6xl">Ebaaa!</Text>
            <Text>
              O cadastro deu certo e foi enviado ao administrador para ser
              aprovado. Agora é só esperar
            </Text>
          </>
        ) : (
          <>
            <Text fontSize="6xl">Aguardando autorização!</Text>
            <Text>
              O cadastro da organização ainda está em análise. Agora é só
              esperar
            </Text>
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
