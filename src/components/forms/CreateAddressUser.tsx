import {
  SimpleGrid,
  Stack,
  HStack,
  Image,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { api } from "../../services/apiCLient";

import { Select } from "../FormsComponents/Select";

export default function CreateUser({
  register,
  errors,
  getValues = null,
  setValue,
}) {
  const cityValue = getValues ? getValues("cityId") : null;
  const stateValue = getValues ? getValues("stateId") : null;
  const [cities, setCities] = useState(null);
  const [states, setState] = useState(null);
  const [stateId, setStateId] = useState(null);
  const [cityId, setCityId] = useState(null);

  useEffect(() => {
    cityValue && setCityId(getValues("cityId"));
    stateValue && setStateId(getValues("stateId"));
  }, [cityValue, getValues, stateValue]);

  useEffect(() => {
    async function getData() {
      await api.get(`/cities/states`).then((response) => {
        setState(response.data);
      });
    }

    getData();
  }, []);

  useEffect(() => {
    setCities(null);
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
              onChange: (e) => {
                setStateId(e.target.value);
                setValue("stateId", e.target.value);
              },
            })}
          />
          {cities ? (
            <Select
              name="city"
              id="city"
              placeholder="Escolha uma cidade"
              label="Cidade"
              data={cities ? cities : []}
              value={cityId}
              error={errors.cityId}
              {...(register("cityId"),
              {
                onChange: (e) => {
                  setCityId(e.target.value);
                  setValue("cityId", e.target.value);
                },
              })}
            />
          ) : (
            <Spinner />
          )}
        </SimpleGrid>
      </Stack>
    </Stack>
  );
}
