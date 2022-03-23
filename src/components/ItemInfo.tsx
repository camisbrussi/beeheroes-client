import { Box, Flex, Heading, Image, Text, Link } from "@chakra-ui/react";

export type Item = {
  id: number;
  name: string;
  image_url: string;
  city: string;
  uf: string;
};

export type ItemInfoProps = {
  item: Item;
};

export function ItemInfo({ item }: ItemInfoProps) {
  const slug = item.id;
  return (
    <Link href={`/organization/${slug}`}>
      <Box
        maxW="250px"
        mx={["auto", "0"]}
        bg="white"
        borderRadius="10"
        borderColor="yellow.100"
        align="left"
      >
        <Image
          boxSize="250px"
          objectFit="cover"
          borderTopRadius="10"
          src={item.image_url}
          alt={item.name}
        />
        <Flex
          justify="space-between"
          align="center"
          p={6}
          border="2px"
          borderColor="yellow.400"
          borderTop="0"
          borderBottomRadius="10"
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
