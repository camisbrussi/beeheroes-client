import { SimpleGrid, Stack, HStack, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import { api } from "../../services/apiCLient";

import { Address, searchCep } from "../../utils/searchCep";
import { Input } from "../FormsComponents/Input";
import { Select } from "../FormsComponents/Select";

export default function CreateUser({ register, errors }) {
  const [cities, setCities] = useState(null);
  const [states, setState] = useState(null);
  const [stateId, setStateId] = useState(null);

  useEffect(() => {
    async function getData() {
      await api.get(`/cities/states`).then((response) => {
        setState(response.data);
      });
    }

    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      await api.get(`/cities?id=${stateId}`).then((response) => {
        setCities(response.data);
      });
    }
    stateId && getData();
  }, [stateId]);

  return (
    <Stack>
      <HStack>
        <Image src="/images/user.svg" alt="logo" boxSize="60px" />
        <Text fontSize="lg">Nos conte qual é a cidade que você reside.</Text>
      </HStack>
      <Stack
        spacing="8"
        w={1160}
        mt={5}
        mx="auto"
        bg="white"
        padding="10"
        borderRadius="10"
      >
        <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
          <Select
            name="state"
            id="state"
            placeholder="Escolha um Estado"
            label="Estado"
            data={states}
            value={stateId}
            error={errors.stateId}
            {...(register("stateId"),
            {
              onChange: (e) => setStateId(e.target.value),
            })}
          />
          <Select
            name="city"
            id="city"
            placeholder="Escolha uma cidade"
            label="Cidade"
            data={cities ? cities : []}
            disabled={!cities && true}
            error={errors.cityId}
            {...register("cityId")}
          />
        </SimpleGrid>
      </Stack>
    </Stack>
  );
}
