import { HStack, Stack, Text, Image } from "@chakra-ui/react";

export function OrganizationStatusWait({ isProfile = null }) {
  console.log(isProfile);
  return (
    <HStack spacing="20" justify="space-between" w={1160} mx="auto">
      <Stack>
        {isProfile ? (
          <>
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
