import {
  Box,
  Stack,
  Icon,
  Flex,
  Input,
  useDisclosure,
  Modal,
  Link,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import debounce from "lodash/debounce";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { api } from "../../services/apiCLient";
import { withSSRGuest } from "../../utils/withSSRGuest";
import { FilterModal } from "../../components/modais/FilterModal";
import { OrganizationList } from "../../components/Lists/OrganizationList";
import { ProjectList } from "../../components/Lists/ProjectsList";
import { VolunteerList } from "../../components/Lists/VolunteerList";
import { DonationList } from "../../components/Lists/DonationList";

interface SearchProps {
  slug: string;
  query: any;
}

// TODO: aplicar lodash da forma correta para não fazer requisição para o back a cada letra digitada

export default function Search({ slug, query }: SearchProps) {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    async function fetchData() {
      query.name = search;
      await api
        .post(`/${slug}/filter`, {
          query,
        })
        .then((response) => {
          setItems(response.data);
        });
    }
    fetchData();
  }, [query, search, slug]);

  return (
    <Flex direction="column" w="100%" align="center" mb={10}>
      <Header />
      <Stack
        maxW={1150}
        direction="row"
        spacing="500px"
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
      <Box>
        {slug === "organizations" && <OrganizationList items={items} />}
        {slug === "projects" && <ProjectList items={items} />}
        {slug === "volunteers" && <VolunteerList items={items} />}
        {slug === "donations" && <DonationList items={items} />}
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <FilterModal onClose={onClose} slug={slug} query={query} />
      </Modal>
    </Flex>
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
