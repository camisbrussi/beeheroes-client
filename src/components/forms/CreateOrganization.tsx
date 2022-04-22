import {
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
  isEdit = null,
  getValues = null,
}) {
  const organizationValue = getValues ? getValues("organizationTypeId") : null;
  const [organizationTypes, setOrganizationTypes] = useState();
  const [organizationTypeId, setOrganizationTypeId] = useState(null);

  useEffect(() => {
    organizationValue && setOrganizationTypeId(organizationValue);
  }, [getValues, organizationValue]);

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
        {isEdit ? (
          <Text fontSize="lg">Edite os dados da organização</Text>
        ) : (
          <Text fontSize="lg">
            Agora, vamos cadastrar os dados da organização
          </Text>
        )}
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
            disabled={isEdit}
            error={errors.cnpj}
            {...register("cnpj")}
          />
          <Select
            name="organization_type"
            id="organization_type"
            placeholder="Escolha um Tipo de Organização"
            label="Tipo de Organização"
            data={organizationTypes}
            value={organizationTypeId}
            error={errors.organizationTypeId}
            {...(register("organizationTypeId"),
            {
              onChange: (e) => {
                setOrganizationTypeId(e.target.value);
                setValue("organizationTypeId", e.target.value);
              },
            })}
          />
        </SimpleGrid>
        <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
          <Input
            name="phone"
            as={InputMask}
            mask="(99) 9999-9999"
            label="Telefone Fixo"
            info="Opcional"
            error={errors.phone}
            {...register("phone")}
          />
          <Stack direction="row" align="end">
            <Input
              name="cellphone"
              as={InputMask}
              mask="(99) 99999-9999"
              label="Whatsapp"
              error={errors.cellphone}
              {...register("cellphone")}
            />
          </Stack>
        </SimpleGrid>
        <Textarea
          name="description"
          label="Descrição"
          error={errors.description}
          {...register("description")}
        />
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
