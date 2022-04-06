import {
  SimpleGrid,
  Stack,
  HStack,
  Image,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import { api } from "../../services/apiCLient";

import { Address, searchCep } from "../../utils/searchCep";
import { Input } from "../FormsComponents/Input";
import { Select } from "../FormsComponents/Select";

export default function CreateUser({
  register,
  errors,
  setValue,
  getValues = null,
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
    async function getData() {
      await api.get(`/cities?id=${stateId}`).then((response) => {
        setCities(response.data);
      });
    }
    stateId && getData();
  }, [stateId]);

  async function getAddress(value) {
    const address: Address = await searchCep(value);

    if (address) {
      setValue("district", address.district, { shouldValidate: true });
      setValue("street", address.street, { shouldValidate: true });
    }
  }

  return (
    <Stack>
      <HStack>
        <Image src="/images/user.svg" alt="logo" boxSize="60px" />
        <Text fontSize="lg">
          Caso não deseja divulgar o endereço da organização, tudo bem! Somente
          a cidade é obrigatória.
        </Text>
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
            error={errors.cityId}
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
        <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
          <Input
            name="cep"
            label="CEP"
            as={InputMask}
            mask="99999-999"
            {...(register("cep"),
            {
              onBlur: (e) => getAddress(e.target.value),
            })}
            error={errors.cep}
          />
          <Input name="district" label="Bairro" {...register("district")} />
        </SimpleGrid>
        <HStack minWidth="240px" spacing="8" w="100%">
          <Input
            width="700px"
            name="street"
            label="Rua"
            error={errors.street}
            {...register("street")}
          />
          <Input
            width="140px"
            name="number"
            label="Número"
            error={errors.number}
            {...register("number")}
          />
          <Input
            width="160px"
            name="complement"
            label="Complemento"
            error={errors.complement}
            {...register("complement")}
          />
        </HStack>
      </Stack>
    </Stack>
  );
}
