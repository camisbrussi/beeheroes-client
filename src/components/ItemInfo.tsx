import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";

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
  return (
    <Box minW="256px" mx={["auto", "0"]}>
      <Image
        borderTopRadius="4"
        src={item.image_url}
        alt={item.name}
        w="256"
        h="173"
        objectFit="cover"
      />
      <Flex
        justify="space-between"
        align="center"
        p={6}
        border="1px"
        borderColor="yellow.100"
        borderTop="0"
        borderBottomRadius="4"
      >
        <Flex direction="column">
          <Heading as="h3" fontSize="xl" fontWeight="600" mb={3}>
            {item.name}
          </Heading>
          <Text color="gray.500" fontSize="md" fontWeight="500">
            {item.city} / {item.uf}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}
