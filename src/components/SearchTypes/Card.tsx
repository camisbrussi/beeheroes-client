import { Divider, Flex, Image, Link, Text } from "@chakra-ui/react";

interface CardInfoProps {
  title: string;
  image: string;
  slug: string;
}

export function Card({ title, image, slug }: CardInfoProps) {
  return (
    <Flex
      w="210px"
      h="220px"
      bg="white"
      borderRadius="10"
      direction="column"
      align="center"
      justify="center"
      boxShadow="md"
    >
      <Link href={`/busca/${slug}`}>
        <Image
          boxSize="120px"
          src={image}
          alt={title}
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
          align="center"
        >
          {title}
        </Text>
      </Link>
    </Flex>
  );
}
