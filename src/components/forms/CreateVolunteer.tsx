import { useEffect, useState } from "react";
import { SimpleGrid, Stack, HStack, Image, Text, Box } from "@chakra-ui/react";
import { api } from "../../services/apiCLient";

import { Input } from "../FormsComponents/Input";
import { Select } from "../FormsComponents/Select";
import { Textarea } from "../FormsComponents/TextArea";

export default function CreateVolunteer({
  register,
  errors,
  isEdit = null,
  setValue,
  getValues = null,
}) {
  const occupationValue = getValues ? getValues("occupationAreaId") : null;
  const [occupationAreaId, setOccupationAreaId] = useState(null);
  const [occupationArea, setOccupationArea] = useState(null);

  useEffect(() => {
    occupationValue && setOccupationAreaId(getValues("occupationAreaId"));
  }, [getValues, occupationValue]);

  useEffect(() => {
    async function getData() {
      await api.get(`/occupationarea`).then((response) => {
        setOccupationArea(response.data);
      });
    }

    getData();
  }, []);
  return (
    <Box>
      <HStack>
        <Image src="/images/user.svg" alt="logo" boxSize="60px" />
        {isEdit ? (
          <Text fontSize="lg">Edite seus dados!</Text>
        ) : (
          <Text fontSize="lg">
            Agora, vamos cadastrar dados importantes em seu perfil de
            voluntário!
          </Text>
        )}
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
            data={occupationArea}
            value={occupationAreaId}
            error={errors.occupationAreaId}
            {...(register("occupationAreaId"),
            {
              onChange: (e) => {
                setOccupationAreaId(e.target.value);
                setValue("occupationAreaId", e.target.value);
              },
            })}
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
