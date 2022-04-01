import { SimpleGrid, Stack, HStack, Image, Text, Box } from "@chakra-ui/react";

import { Input } from "../FormsComponents/Input";
import CreateAvatar from "../../components/forms/CreateAvatar";

export default function CreateUser({ register, errors, setValue, setError }) {
  return (
    <Box>
      <HStack>
        <Image src="/images/user.svg" alt="logo" boxSize="60px" />
        <Text fontSize="lg">
          Vamos iniciar cadastrando os seus dados de acesso!
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
          <Input
            name="name"
            label="Nome Completo"
            error={errors.name}
            {...register("name")}
          />
          <Input
            name="email"
            type="email"
            label="E-mail"
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
            name="password_confirmation"
            type="password"
            label="Confirmação da senha"
            error={errors.passwordConfirmation}
            {...register("password_confirmation")}
          />
        </SimpleGrid>
        <CreateAvatar
          register={register}
          errors={errors}
          setValue={setValue}
          setError={setError}
          name="avatarUser"
        />
      </Stack>
    </Box>
  );
}
