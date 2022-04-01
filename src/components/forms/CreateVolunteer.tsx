import { useEffect, useState } from "react";
import { SimpleGrid, Stack, HStack, Image, Text, Box } from "@chakra-ui/react";
import { api } from "../../services/apiCLient";

import { Input } from "../FormsComponents/Input";
import { Select } from "../FormsComponents/Select";
import { Textarea } from "../FormsComponents/TextArea";

export default function CreateUser({ register, errors }) {
  const [occupationAreaId, setOccupationAreaId] = useState();

  useEffect(() => {
    async function getData() {
      await api.get(`/occupationarea`).then((response) => {
        setOccupationAreaId(response.data);
      });
    }

    getData();
  }, []);
  return (
    <Box>
      <HStack>
        <Image src="/images/user.svg" alt="logo" boxSize="60px" />
        <Text fontSize="lg">
          Agora, vamos cadastrar dados importantes em seu perfil de voluntário!
        </Text>
        <Text fontSize="sm">(Todos os dados são obrigatórios)</Text>
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
        <SimpleGrid minChildWidth="100px" spacing="8" w="100%">
          <Select
            name="occupation_area_id"
            id="occupation_area_id"
            placeholder="Escolha uma área de atuação"
            label="Área de ocupação"
            data={occupationAreaId}
            required={true}
            error={errors.occupationAreaId}
            {...register("occupationAreaId")}
          />
          <Input
            name="profession"
            type="profession"
            label="Profissão"
            error={errors.profession}
            {...register("profession")}
          />
        </SimpleGrid>
        <Textarea
          name="description"
          label="Descrição"
          error={errors.description}
          {...register("description")}
        />
      </Stack>
    </Box>
  );
}
