import {
  Box,
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
import { Evaluation } from "../Evaluation";

interface InfoUserProps {
  data: Volunteer;
  isProfile?: boolean;
}

export function VolunteerData({ data, isProfile }: InfoUserProps) {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Divider mt={9} borderColor="blue.600" />
      <Flex w={1160} justify="space-between">
        <HStack spacing="20" mt={5} w={700}>
          <Stack>
            <Text fontWeight="600">Conheça um pouco sobre o voluntário</Text>
            <Text fontSize="md" fontWeight="600">
              Sobre: <Text fontWeight="400">{data?.description} </Text>
            </Text>
            <Flex>
              <Text fontSize="md" fontWeight="600">
                Profissão:
              </Text>
              <Text fontWeight="400" mx={1}>
                {data?.profession}
              </Text>
            </Flex>
            <Flex>
              <Text fontSize="md" fontWeight="600">
                Área de Atuação:
              </Text>
              <Text fontWeight="400" mx={1}>
                {data?.occupation_area.name}
              </Text>
            </Flex>
            <Flex justify="center">
              {isProfile && (
                <Link href={`/volunteers/edit/${user?.id}`}>
                  <Tag mt={8} ml={3} colorScheme="yellow">
                    Editar dados
                  </Tag>
                </Link>
              )}
            </Flex>
          </Stack>
        </HStack>
        <Evaluation />
      </Flex>
    </>
  );
}
