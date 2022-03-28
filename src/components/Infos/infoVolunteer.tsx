import { HStack, Stack, Text, Image } from "@chakra-ui/react";

interface InfoUserProps {
  data: Volunteer;
}

export type Volunteer = {
  id: string;
  description: string;
  profession: string;
  occupation_area: {
    name: string;
  };
};

export function InfoVolunteer({ data }: InfoUserProps) {
  return (
    <HStack spacing="20" w={1160} mt={20} mx="auto">
      <Stack>
        <Text fontSize="xl">{data?.description} </Text>{" "}
        <Text fontSize="md">Profissão: {data?.profession}</Text>
        <Text fontSize="md">Área de Atuação: {data?.occupation_area.name}</Text>
      </Stack>
    </HStack>
  );
}
