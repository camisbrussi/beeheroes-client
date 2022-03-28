import { HStack, Stack, Text, Image, Tag, Link } from "@chakra-ui/react";

interface InfoUserProps {
  data: User;
}

export type User = {
  id: string;
  name: string;
  description: string;
  email: string;
  avatar_url: string;
  is_volunteer: boolean;
  address: {
    city: string;
    uf: string;
  };
};

export function InfoUser({ data }: InfoUserProps) {
  return (
    <HStack spacing="20" w={1160} mt={20} mx="auto">
      <Image
        ml="10px"
        boxSize="250px"
        objectFit="cover"
        borderRadius="10"
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
        <Text fontSize="lg">{data?.description}</Text>
        <Text fontSize="md">E-mail: {data?.email}</Text>
        <Text>
          {data?.address?.city}/{data?.address?.uf}
        </Text>
      </Stack>
    </HStack>
  );
}
