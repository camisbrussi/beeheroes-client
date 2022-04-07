import { Divider, Flex, Icon, Link, Text, Center } from "@chakra-ui/react";
import { AiOutlineCalendar } from "react-icons/ai";
import moment from "moment";
import { Project } from "../../@types/project";

interface CardInfoProps {
  data: Project;
}

export function Card({ data }: CardInfoProps) {
  const startDate = moment(data?.start).format("DD/MM/YYYY, h:mm");
  const endDate = moment(data?.end).format("DD/MM/YYYY, h:mm");
  return (
    <Flex
      w="250px"
      h="210px"
      bg="white"
      borderRadius="10"
      align="center"
      justify="center"
      boxShadow="md"
    >
      <Link href={`/project/${data?.id}`}>
        <Center w="200px" h="100px">
          <Text
            align="center"
            color="gray.500"
            fontSize="lg"
            fontWeight="500"
            mb="20px"
            mt="20px"
          >
            {data?.name}
          </Text>
        </Center>
        <Flex align="center">
          <Icon as={AiOutlineCalendar} mx="2" color="green" />
          <Text fontSize="md">{startDate}</Text>
          <Text fontSize="xs" ml="1">
            (Início)
          </Text>
        </Flex>
        {endDate && (
          <Flex align="center" mt="2">
            <Icon as={AiOutlineCalendar} mx="2" color="red" />
            <Text fontSize="md">{endDate}</Text>
            <Text fontSize="xs" ml="1">
              (Fim)
            </Text>
          </Flex>
        )}
        <Divider mt="3" />
        <Flex align="center" justify="center" mt="2" mb="5">
          {data?.vacancies ? (
            <Text fontSize="md">Vagas: {data?.vacancies}</Text>
          ) : (
            <Text fontSize="md">Vagas: Livre</Text>
          )}
        </Flex>
      </Link>
    </Flex>
  );
}
