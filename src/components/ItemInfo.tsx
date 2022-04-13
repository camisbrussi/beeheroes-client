import { Box, Flex, Heading, Image, Text, Link } from "@chakra-ui/react";

export interface Item {
  id: number;
  name: string;
  avatar: string;
  city: string;
  uf: string;
}

export interface ItemInfoProps {
  item: Item;
  slug: string;
}

export function ItemInfo({ item, slug }: ItemInfoProps) {
  return (
    <Link href={`/${slug}/${item.id}`}>
      <Box maxW="250px" bg="white" borderRadius="10" textAlign="left">
        <Image
          boxSize="250px"
          objectFit="cover"
          borderTopRadius="10"
          src={
            item?.avatar
              ? `${process.env.NEXT_PUBLIC_AWS_BUCKET_URL}/avatar/${item?.avatar}`
              : "/images/responsible.svg"
          }
          alt={item?.name}
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
              {item.name}
            </Heading>
            <Text color="gray.400" fontSize="md" fontWeight="500">
              {item.city} / {item.uf}
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Link>
  );
}
