import { Divider, Flex, Icon, Link, Text, Center } from "@chakra-ui/react";
import { AiOutlineCalendar } from "react-icons/ai";
import moment from "moment";

interface CardInfoProps {
  id: string;
  name: string;
  start: string;
  end?: string;
  vacancies?: number;
}

export function Card({ name, start, end, vacancies, id }: CardInfoProps) {
  const startDate = moment(start).format("DD/MM/YYYY, h:mm");
  const endDate = moment(end).format("DD/MM/YYYY, h:mm");
  return (
    <Flex
      w="250px"
      h="210px"
      bg="white"
      borderRadius="10"
      align="center"
      justify="center"
    >
      <Link href={`/project/${id}`}>
        <Center w="200px" h="100px">
          <Text
            align="center"
            color="gray.500"
            fontSize="lg"
            fontWeight="500"
            mb="20px"
            mt="20px"
          >
            {name}
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
          {vacancies ? (
            <Text fontSize="md">{vacancies}</Text>
          ) : (
            <Text fontSize="md">Livre</Text>
          )}
        </Flex>
      </Link>
    </Flex>
  );
}
