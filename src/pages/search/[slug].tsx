import { Box, SimpleGrid, Stack } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import { Button } from "../../components/Button";

import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Item, ItemInfo } from "../../components/ItemInfo";
import { api } from "../../services/apiCLient";

interface SearchProps {
  items: Item[];
}

export default function Search({ items }: SearchProps) {
  return (
    <Box w="100vw" h="100vh" minW={1440} mx="auto">
      <Header hasBackButton />
      <Stack
        direction="row"
        justify="end"
        mt="10"
        mx="230px"
        left={["16px", "40px"]}
      >
        <Button title="Filtrar" />
      </Stack>

      <SimpleGrid
        columns={[1, 4]}
        spacing={[5, 10]}
        my={["5", "45px"]}
        minChildWidth="256px"
      >
        {items?.map((item) => (
          <ItemInfo key={item.id} item={item} />
        ))}
      </SimpleGrid>
      <Footer />
    </Box>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let items: Item[];

  const { slug } = params;

  console.log(slug);
  const response = await api.get<Item[]>(`/${slug}`).then((response) => {
    items = response.data;
  });

  console.log(response);

  return {
    props: {
      items,
    },
    revalidate: 60 * 60, // 1 hour,
  };
};
