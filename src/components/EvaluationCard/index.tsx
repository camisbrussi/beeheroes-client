import { StarIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Image,
  Text,
  Link,
  Avatar,
  Divider,
} from "@chakra-ui/react";
import { Evaluation } from "../../@types/evaluation";
import { ItemEvaluation } from "./item";

interface InfoEvaluationsProps {
  evaluations: Evaluation[];
}

export function EvaluationCard({ evaluations }: InfoEvaluationsProps) {
  let scoreTotal = 0;

  evaluations?.map((evaluation) => {
    scoreTotal += evaluation.score;
  });

  scoreTotal = scoreTotal / evaluations?.length;

  return (
    <Box maxW="xl" overflow="hidden" mt={5}>
      <Flex justify="space-between">
        <Text fontWeight="600" fontSize="lg">
          Avaliações
        </Text>
        {evaluations?.length > 0 && (
          <Flex mr={5} justify="center" align="center" fontSize="lg">
            <StarIcon color="yellow.500" />
            <Text ml={2} fontWeight="600">
              {scoreTotal.toFixed(1)}
            </Text>
          </Flex>
        )}
      </Flex>
      <Divider mt={2} mb={3} borderColor="blue.600" />

      {evaluations?.length > 0 ? (
        <Box
          maxH={400}
          overflowY="auto"
          css={{
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-track": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "gray",
              borderRadius: "24px",
            },
          }}
        >
          {evaluations?.map((evaluation) => (
            <>
              <ItemEvaluation key={evaluation.id} evaluation={evaluation} />
            </>
          ))}
        </Box>
      ) : (
        <Text>O voluntário ainda não recebeu nenhuma avaliação</Text>
      )}
    </Box>
  );
}
