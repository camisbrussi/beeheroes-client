import {
  SimpleGrid,
  Stack,
  HStack,
  Image,
  Text,
  Box,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { Input } from "../FormsComponents/Input";
import { Select } from "../FormsComponents/Select";
import { Textarea } from "../FormsComponents/TextArea";

export default function CreateProject({
  register,
  errors,
  isEdit = null,
  getValues = null,
  setValue = null,
}) {
  const statusValue = getValues ? getValues("status") : null;
  const [status, setStatus] = useState("1");

  useEffect(() => {
    statusValue && setStatus(statusValue);
  }, [getValues, statusValue]);

  const statusData = [
    {
      id: "1",
      name: "Ativa",
    },
    {
      id: "2",
      name: "Finalizada",
    },
    {
      id: "3",
      name: "Suspensa",
    },
  ];
  return (
    <Box>
      <HStack>
        <Image src="/images/user.svg" alt="logo" boxSize="60px" />
        {isEdit ? (
          <Text fontSize="lg">Edite os dados da doação!</Text>
        ) : (
          <Text fontSize="lg">Cadestre os dados da doação!</Text>
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
            label="Nome da solicitação da doação"
            error={errors.name}
            {...register("name")}
          />
          <InputGroup size="lg">
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              mt={8}
              // eslint-disable-next-line react/no-children-prop
              children="R$"
            />
            <Input
              name="totalValue"
              type="number"
              pattern="\d*"
              label="Valor a ser arrecadado"
              info="Caso não houver preencha com 0"
              paddingLeft={14}
              error={errors.totalValue}
              {...register("totalValue")}
            />
          </InputGroup>
        </SimpleGrid>
        <Textarea
          name="description"
          label="Descrição"
          info="Adicione na descrição a orientação necessária para o voluntário efetuar a doação"
          error={errors.description}
          {...register("description")}
        />
        <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
          <Select
            name="status"
            id="status"
            label="Status"
            placeholder=" "
            data={statusData}
            value={status}
            error={errors.status}
            {...(register("status"),
            {
              onChange: (e) => {
                setStatus(e.target.value);
                setValue("status", e.target.value);
              },
            })}
          />
          <InputGroup size="lg">
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              mt={8}
              // eslint-disable-next-line react/no-children-prop
              children="R$"
            />
            <Input
              name="totalCollected"
              label="Valor arrecadado"
              info="Caso não houver preencha com 0"
              type="number"
              pattern="\d*"
              paddingLeft={14}
              error={errors.totalCollected}
              {...register("totalCollected")}
            />
          </InputGroup>
        </SimpleGrid>
      </Stack>
    </Box>
  );
}
