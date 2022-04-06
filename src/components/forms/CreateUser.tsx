import { SimpleGrid, Stack, HStack, Image, Text, Box } from "@chakra-ui/react";

import { Input } from "../FormsComponents/Input";
import CreateAvatar from "../../components/forms/CreateAvatar";

export default function CreateUser({
  register,
  errors,
  setValue,
  setError,
  isEdit = null,
  getValues = null,
}) {
  return (
    <Box>
      <HStack>
        <Image src="/images/user.svg" alt="logo" boxSize="60px" />
        {isEdit ? (
          <Text fontSize="lg">Edite seus dados de acesso!</Text>
        ) : (
          <Text fontSize="lg">
            Vamos iniciar cadastrando os seus dados de acesso!
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
        boxShadow="md"
        p="6"
      >
        <SimpleGrid minChildWidth="100px" spacing="8" w="100%">
          <Input
            name="name"
            label="Nome Completo"
            error={errors.name}
            {...register("name")}
          />
          <Input
            name="email"
            type="email"
            label="Email"
            error={errors.email}
            {...register("email")}
          />
        </SimpleGrid>
        <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
          <Input
            name="password"
            type="password"
            label="Senha"
            error={errors.password}
            {...register("password")}
          />
          <Input
            name="passwordConfirmation"
            type="password"
            label="Confirmação da senha"
            error={errors.passwordConfirmation}
            {...register("passwordConfirmation")}
          />
        </SimpleGrid>
        <CreateAvatar
          register={register}
          errors={errors}
          setValue={setValue}
          setError={setError}
          getValues={getValues}
          name="avatarUser"
        />
      </Stack>
    </Box>
  );
}
