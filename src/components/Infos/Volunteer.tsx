import {
  Divider,
  Flex,
  HStack,
  Link,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import { useContext } from "react";
import { Volunteer } from "../../@types/volunteer";
import { AuthContext } from "../../context/AuthContext";

interface InfoUserProps {
  data: Volunteer;
  isProfile?: boolean;
}

export function VolunteerData({ data, isProfile }: InfoUserProps) {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Divider mt={9} borderColor="blue.600" />
      <HStack spacing="20" w={1160} mt={5} mx="auto">
        <Stack>
          <Text fontWeight="600">Conheça um pouco sobre o voluntário</Text>
          <Text fontSize="md">Sobre: {data?.description} </Text>
          <Text fontSize="md">Profissão: {data?.profession}</Text>
          <Text fontSize="md">
            Área de Atuação: {data?.occupation_area.name}
          </Text>
          <Flex justify="center">
            {isProfile && (
              <Link href={`/volunteer/edit/${user?.id}`}>
                <Tag mt={8} ml={3} colorScheme="yellow">
                  Editar dados
                </Tag>
              </Link>
            )}
          </Flex>
        </Stack>
      </HStack>
    </>
  );
}
