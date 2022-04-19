import { StarIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Text,
  Avatar,
  Link,
  Stack,
  Divider,
} from "@chakra-ui/react";

export function ItemEvaluation({ evaluation }) {
  return (
    <Flex maxW="sm" overflow="hidden">
      <Link href={`/organizations/${evaluation?.organization?.id}`}>
        <Avatar
          mt={5}
          src={
            evaluation?.organization?.avatar
              ? `${process.env.NEXT_PUBLIC_AWS_BUCKET_URL}/avatar/${evaluation?.organization?.avatar}`
              : null
          }
        />
      </Link>
      <Stack m={5}>
        <Flex>
          <Link href={`/organizations/${evaluation?.organization?.id}`}>
            <Text fontSize="md">{evaluation?.organization?.name}</Text>
          </Link>
          <Box display="flex" mt="2" alignItems="center" ml={20}>
            {Array(5)
              .fill("")
              .map((_, i) => (
                <StarIcon
                  key={i}
                  color={i < evaluation?.score ? "yellow.500" : "gray.300"}
                />
              ))}
          </Box>
        </Flex>
        <Link href={`/projects/${evaluation?.project?.id}`}>
          <Text fontSize="sm" fontWeight="bold">
            {evaluation?.project?.name}
          </Text>
        </Link>
        <Text fontSize="sm">{evaluation?.description}</Text>
      </Stack>
    </Flex>
  );
}
