import { Box, SimpleGrid, Stack, Icon, Flex, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import debounce from "lodash/debounce";
import { Button } from "../../components/Button";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Item, ItemInfo } from "../../components/ItemInfo";
import { api } from "../../services/apiCLient";
import { withSSRGuest } from "../../utils/withSSRGuest";

interface SearchProps {
  slug: string;
}

// TODO: aplicar lodash da forma correta para não fazer requisição para o back a cada letra digitada

export default function Search({ slug }: SearchProps) {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await api
        .post<Item[]>(`/${slug}/filter`, {
          name: search,
        })
        .then((response) => {
          setItems(response.data);
        });
    }
    fetchData();
  }, [search, slug]);

  return (
    <Box w="100%" minW={1440} align="center">
      <Header hasBackButton />
      <Stack
        direction="row"
        justify="space-between"
        mt="10"
        mx="230px"
        left={["16px", "40px"]}
      >
        <Flex
          as="label"
          flex="1"
          py="3"
          px="8"
          maxWidth={400}
          alignSelf="center"
          color="brown.600"
          position="relative"
          bg="white"
          borderRadius="4"
        >
          <Input
            color="brown.600"
            variant="unstyled"
            px="4"
            mr="4"
            placeholder="Busca por nome"
            _placeholder={{ color: "brown.300" }}
            // value={search}
            onChange={debounce((event) => setSearch(event.target.value))}
          />
          <Icon as={RiSearchLine} fontSize="20"></Icon>
        </Flex>
        <Button title="Aplicar Filtro" />
      </Stack>
      <Box maxW="1240" h="100%" px={["4", "10"]}>
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
      </Box>
      <Footer />
    </Box>
  );
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
  const { slug } = ctx.params;

  return {
    props: {
      slug,
    },
  };
});
