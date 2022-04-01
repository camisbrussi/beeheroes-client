import {
  Checkbox,
  HStack,
  SimpleGrid,
  Stack,
  VStack,
  Image,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import { api } from "../../services/apiCLient";

import { Input } from "../FormsComponents/Input";
import { Select } from "../FormsComponents/Select";
import { Textarea } from "../FormsComponents/TextArea";
import CreateAvatar from "../../components/forms/CreateAvatar";

export default function CreateOrganization({
  register,
  errors,
  setValue,
  setError,
}) {
  const [organizationTypes, setOrganizationTypes] = useState();

  useEffect(() => {
    async function getData() {
      await api.get(`/organizationtypes`).then((response) => {
        setOrganizationTypes(response.data);
      });
    }

    getData();
  }, []);

  return (
    <Stack>
      <HStack>
        <Image src="/images/user.svg" alt="logo" boxSize="60px" />
        <Text fontSize="lg">
          Agora, vamos cadastrar os dados da organização
        </Text>
        <Text fontSize="sm">(Todos os dados são obrigatórios)</Text>
      </HStack>
      <VStack
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
            name="name_organization"
            label="Nome"
            error={errors.nameOrganization}
            {...register("nameOrganization")}
          />
          <Input
            name="email"
            type="email"
            label="E-mail"
            error={errors.emailOrganization}
            {...register("emailOrganization")}
          />
        </SimpleGrid>

        <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
          <Input
            name="cnpj"
            as={InputMask}
            mask="99.999.999/9999-99"
            label="CNPJ"
            error={errors.cnpj}
            {...register("cnpj")}
          />
          <Select
            name="organization_type"
            id="organization_type"
            placeholder="Escolha um Tipo de Organização"
            label="Tipo de Organização"
            data={organizationTypes}
            required={true}
            error={errors.organizationType}
            {...register("organizationType")}
          />
        </SimpleGrid>
        <Textarea
          name="description"
          label="Descrição"
          error={errors.description}
          {...register("description")}
        />
        <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
          <Input
            name="phone"
            as={InputMask}
            mask="(99) 9999-9999"
            label="Telefone"
            error={errors.phone}
            {...register("phone")}
          />
          <Stack direction="row" align="end">
            <Input
              name="cellphone"
              as={InputMask}
              mask="(99) 99999-9999"
              label="Celular"
              error={errors.cellphone}
              {...register("cellphone")}
            />
            <Checkbox
              colorScheme="yellow"
              error={errors.isWhatsapp}
              {...register("isWhatsapp")}
            >
              Whatsapp
            </Checkbox>
          </Stack>
        </SimpleGrid>
        <CreateAvatar
          register={register}
          errors={errors}
          setValue={setValue}
          setError={setError}
          name="avatarOrganization"
        />
      </VStack>
    </Stack>
  );
}
