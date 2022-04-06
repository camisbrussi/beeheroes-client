import { Stack, Text, Image, HStack, Divider, Box } from "@chakra-ui/react";
import { Address } from "../../@types/address";

interface InfoAddress {
  data: Address;
}

export function AddressData({ data }: InfoAddress) {
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

            {data?.city.name && (
              <Text>
                {data?.city.name}/{data?.city.state.uf}
              </Text>
            )}
          </HStack>
        </Box>
      )}
    </Stack>
  );
}
