import { SimpleGrid, Stack, HStack, Image, Text, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import moment from "moment";

import { Input } from "../FormsComponents/Input";
import { Textarea } from "../FormsComponents/TextArea";

export default function CreateProject({
  register,
  errors,
  isEdit = null,
  setValue = null,
  getValues = null,
}) {
  const startValue = getValues ? getValues("start") : null;
  const endValue = getValues ? getValues("end") : null;
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    startValue && setStartDate(moment(startValue).format("YYYY-MM-DDThh:mm"));
    endValue && setEndDate(moment(endValue).format("YYYY-MM-DDThh:mm"));
  }, [endValue, getValues, startValue]);

  return (
    <Box>
      <HStack>
        <Image src="/images/user.svg" alt="logo" boxSize="60px" />
        {isEdit ? (
          <Text fontSize="lg">Edite os dados do projeto!</Text>
        ) : (
          <Text fontSize="lg">Cadestre os dados do projeto!</Text>
        )}
      </HStack>
      <Stack
        spacing="8"
        w={1160}
        mt={5}
        mx="auto"
        bg="white"
        padding="10"
        borderRadius="10"
        boxShadow="md"
        p="6"
      >
        <SimpleGrid minChildWidth="100px" spacing="8" w="100%">
          <Input
            name="name"
            label="Nome do Projeto"
            error={errors.name}
            {...register("name")}
          />
          <Input
            name="vacancies"
            type="number"
            label="Vagas"
            info="Caso não houver limite de vagas preencha com 0"
            error={errors.vacancies}
            {...register("vacancies")}
          />
        </SimpleGrid>
        <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
          <Input
            name="start"
            type="datetime-local"
            value={startDate}
            label="Início"
            error={errors.start}
            {...(register("start"),
            {
              onChange: (e) => {
                setStartDate(e.target.value);
                setValue("start", e.target.value);
              },
            })}
          />
          <Input
            name="end"
            type="datetime-local"
            value={endDate}
            label="Fim"
            error={errors.end}
            {...(register("end"),
            {
              onChange: (e) => {
                setEndDate(e.target.value);
                setValue("end", e.target.value);
              },
            })}
          />
        </SimpleGrid>
        <Textarea
          name="description"
          label="Descrição"
          info="Adicione na descrição a orientação necessária para o voluntário que quer participar do projeto"
          error={errors.description}
          {...register("description")}
        />
      </Stack>
    </Box>
  );
}
