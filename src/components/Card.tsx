import { Divider, Flex, Image, Link, Text } from "@chakra-ui/react";

interface CardInfoProps {
  title: string;
  image: string;
  slug: string;
}

export function Card({ title, image, slug }: CardInfoProps) {
  return (
    <Flex
      w="250px"
      h="220px"
      mx={["auto", "0"]}
      bg="white"
      borderRadius="10"
      direction="column"
      align="center"
      justify="center"
    >
      <Link href={`/search/${slug}`}>
        <Image
          src={image}
          alt={title}
          w="120"
          h="100"
          objectFit="cover"
          mx="auto"
          mt="20px"
          mb="20px"
        />
        <Divider />
        <Text
          color="gray.500"
          fontSize="md"
          fontWeight="500"
          mb="20px"
          mt="20px"
        >
          {title}
        </Text>
      </Link>
    </Flex>
  );
}
