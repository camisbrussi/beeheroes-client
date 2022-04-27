import { Box, Flex, Heading, Image, Text, Link } from "@chakra-ui/react";
import { Volunteer } from "../../@types/volunteer";

export interface Item {
  id: number;
  name: string;
  avatar: string;
  city: string;
  uf: string;
}

export interface ItemInfoProps {
  item: Volunteer;
  slug: string;
}

export function CardVolunteer({ item }: ItemInfoProps) {
  return (
    <Link href={`/users/profile/${item?.user?.id}`}>
      <Box w="250px" bg="white" borderRadius="10" textAlign="left">
        <Image
          boxSize="250px"
          objectFit="cover"
          borderTopRadius="10"
          src={
            item?.user?.avatar
              ? `${process.env.NEXT_PUBLIC_AWS_BUCKET_URL}/avatar/${item?.user?.avatar}`
              : "/images/volunteer.svg"
          }
          alt={item?.user?.name}
        />
        <Flex
          justify="space-between"
          align="center"
          p={6}
          border="2px"
          borderTop="0"
          borderBottomRadius="10"
          boxShadow="md"
        >
          <Flex direction="column">
            <Heading as="h3" fontSize="xl" fontWeight="600" mb={3}>
              {item?.user?.name}
            </Heading>
            <Text color="gray.400" fontSize="md" fontWeight="500">
              {item?.user?.address?.city?.name} /{" "}
              {item?.user?.address?.city?.state.uf}
            </Text>
            <Text color="gray.400" fontSize="sm" fontWeight="500">
              {item?.occupation_area}
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Link>
  );
}
