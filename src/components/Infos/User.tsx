import { HStack, Stack, Text, Image } from "@chakra-ui/react";

interface InfoUserProps {
  data: InfoUser;
}

export type InfoUser = {
  id?: string;
  name: string;
  email: string;
  avatar_url: string;
  is_volunteer: boolean;
  address?: {
    city: string;
    uf: string;
  };
};

export function User({ data }: InfoUserProps) {
  return (
    <HStack spacing="20" w={1160} mt={20} mx="auto">
      <Image
        boxSize="270px"
        objectFit="cover"
        borderRadius="full"
        src={data?.avatar_url ? data?.avatar_url : "/images/user.svg"}
        alt={data?.name}
      />

      <Stack>
        <Text fontSize="5xl">{data?.name} </Text>{" "}
        {data.is_volunteer ? (
          <Stack direction="row" justify="center" align="center">
            <Text fontSize="xl">Eu sou Voluntário</Text>
            <Image src="/images/logo.svg" alt="logo" m="auto" boxSize="50px" />
          </Stack>
        ) : (
          <Stack direction="row" justify="center" align="center">
            <Text fontSize="xl">Eu sou Responsável por uma entidade</Text>
            <Image
              src="/images/responsible.svg"
              alt="logo"
              m="auto"
              boxSize="50px"
            />
          </Stack>
        )}
        <Text fontSize="md">E-mail: {data?.email}</Text>
        {data?.address?.city && (
          <Text>
            {data?.address?.city}/{data?.address?.uf}
          </Text>
        )}
      </Stack>
    </HStack>
  );
}
