import {
  Box,
  SimpleGrid,
  Stack,
  Icon,
  Flex,
  Input,
  useDisclosure,
  Modal,
  Link,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import debounce from "lodash/debounce";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Item, ItemInfo } from "../../components/ItemInfo";
import { api } from "../../services/apiCLient";
import { withSSRGuest } from "../../utils/withSSRGuest";
import { FilterModal } from "../../components/modais/FilterModal";

interface SearchProps {
  slug: string;
  query: any;
}

// TODO: aplicar lodash da forma correta para não fazer requisição para o back a cada letra digitada

export default function Search({ slug, query }: SearchProps) {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    async function fetchData() {
      query.name = search;
      await api
        .post<Item[]>(`/${slug}/filter`, {
          query,
        })
        .then((response) => {
          setItems(response.data);
        });
    }
    fetchData();
  }, [query, search, slug]);

  return (
    <Box w="100%" align="center">
      <Header />
      <Stack
        maxW={1150}
        direction="row"
        justify="space-between"
        left={["16px", "40px"]}
        mt={10}
      >
        <Flex mt={10}>
          <Button title="Criar Filtro" onClick={onOpen} />
          <Link href={`/busca/${slug}?status=1`} fontWeight="bold" p="4">
            Limpar Filtro
          </Link>
        </Flex>
        <Flex
          flex="1"
          py="3"
          px="8"
          maxWidth={400}
          alignSelf="center"
          color="brown.600"
          position="relative"
          bg="white"
          borderRadius="4"
          boxShadow="md"
          p="6"
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
      </Stack>
      <Box maxW="1240" h="100%" px={["4", "10"]}>
        <SimpleGrid
          columns={[2, 4]}
          spacing={[5, 10]}
          my={["5", "5"]}
          minChildWidth={isWideVersion ? "250px" : "150px"}
        >
          {items?.map((item) => (
            <ItemInfo key={item.id} item={item} slug={slug} />
          ))}
        </SimpleGrid>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <FilterModal onClose={onClose} slug={slug} query={query} />
      </Modal>
    </Box>
  );
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
  const { query } = ctx;
  const { slug } = ctx.params;

  return {
    props: {
      slug,
      query,
    },
  };
});
