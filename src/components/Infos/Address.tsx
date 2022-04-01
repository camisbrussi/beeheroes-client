import { Stack, Text, Image, HStack, Divider, Box } from "@chakra-ui/react";

interface InfoAddress {
  data: Address;
}

export type Address = {
  street: string;
  number: string;
  complement: string;
  district: string;
  city: string;
  uf: string;
  cep: string;
};

export function Address({ data }: InfoAddress) {
  return (
    <Stack>
      {data && (
        <Box w={1160} mt={20} mx="auto" fontSize="lg">
          <Divider />
          <Text mt={5}>Endereço</Text>

          <HStack justify="left" w={1160} mt={5} mx="auto">
            <Image
              ml="10px"
              objectFit="cover"
              borderRadius="10"
              src="/images/maps.png"
              alt="Desenho de uma abelha carregando mel em seu carrinho"
            />
            <Text>
              R. {data?.street}, {data?.number} - {data?.complement}
              {data?.district},
            </Text>

            {data?.city && (
              <Text>
                {data?.city}/{data?.uf}
              </Text>
            )}
          </HStack>
        </Box>
      )}
    </Stack>
  );
}
