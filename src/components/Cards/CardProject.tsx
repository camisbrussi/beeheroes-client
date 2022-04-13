import { Link, Text, Box, Badge, Divider, Flex } from "@chakra-ui/react";
import moment from "moment";
import { ProjectList } from "../../@types/project";

interface CardInfoProps {
  data: ProjectList;
  status?: {
    color: string;
    name: string;
  };
  vacancies?: number;
  total_subscription?: number;
}

export function CardProject({
  data,
  status = null,
  vacancies = null,
  total_subscription = null,
}: CardInfoProps) {
  const startDate = moment(data?.start).format("DD/MM/YYYY, h:mm");
  const endDate = moment(data?.end).format("DD/MM/YYYY, h:mm");

  const isThereSlots =
    total_subscription <= vacancies || (vacancies === 0 && true);

  return (
    <Flex
      maxW="xs"
      minW="xs"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="white"
      boxShadow="md"
      align="center"
      justify="center"
    >
      <Link href={`/projects//${data.id}`}>
        <Box p="6">
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {data.name}
          </Box>
          <Box alignItems="center">
            <Badge borderRadius="full" colorScheme={status?.color}>
              {status?.name}
            </Badge>
          </Box>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            mt={3}
          >
            <Box>{startDate} Início</Box>
            <Box>&bull;</Box>
            <Box>{endDate} Fim</Box>
          </Box>
          <Divider borderColor="blue.600" mt={4} />

          <Box mt={5}>
            {isThereSlots ? (
              <Text> Vagas Disponíveis</Text>
            ) : (
              <Text> Vagas Preenchidas</Text>
            )}
          </Box>

          {/* <Box display="flex" mt="2" alignItems="center">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <StarIcon key={i} color={i < 4 ? "teal.500" : "gray.300"} />
            ))}
        </Box> */}
        </Box>
      </Link>
    </Flex>
  );
}
