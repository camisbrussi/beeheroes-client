import { Divider, Flex, Icon, Link, Text, Center, Box } from "@chakra-ui/react";
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
    <Box
      w="xl"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="white"
      boxShadow="md"
      p="6"
    >
      <Box h="80px">
        <Link href={`/project/${data?.id}`}>
          <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
            <Text
              align="center"
              color="gray.500"
              fontSize="md"
              fontWeight="500"
              mb="20px"
              mt="20px"
            >
              {data?.name}
            </Text>
          </Box>
        </Link>
      </Box>
      <Box h="80px">
        <Flex align="center">
          <Icon as={AiOutlineCalendar} mx="2" color="green" />
          <Text fontSize="xs">{startDate}</Text>
          <Text fontSize="xs" ml="1">
            (Início)
          </Text>
        </Flex>
        {endDate && (
          <Flex align="center" mt="2">
            <Icon as={AiOutlineCalendar} mx="2" color="red" />
            <Text fontSize="xs">{endDate}</Text>
            <Text fontSize="xs" ml="1">
              (Fim)
            </Text>
          </Flex>
        )}
      </Box>

      <Divider mt="3" borderColor="blue.600" />
      <Flex align="center" justify="center" mt="2" mb="5">
        {data?.vacancies ? (
          <Text fontSize="md">Vagas: {data?.vacancies}</Text>
        ) : (
          <Text fontSize="md">Vagas: Livre</Text>
        )}
      </Flex>
    </Box>
  );
}
