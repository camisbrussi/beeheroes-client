import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { hotjar } from "react-hotjar";

import { Button } from "../../components/Button";
import CreateAddress from "../../components/forms/CreateAddress";
import CreateOrganization from "../../components/forms/CreateOrganization";
import CreateUser from "../../components/forms/CreateUser";
import { Header } from "../../components/Header";
import { api } from "../../services/apiCLient";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CreateOrganizationFormData } from "../../@types/organization";
import { useRouter } from "next/router";

const createOrganizationFormSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: yup
    .string()
    .required("Senha obrigatória")
    .min(6, "No mínimo 6 caracteres"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Senhas não conferem"),
  nameOrganization: yup.string().required("Nome obrigatório"),
  emailOrganization: yup
    .string()
    .required("E-mail obrigatório")
    .email("E-mail inválido"),
  cnpj: yup.string().required("CNPJ obrigatório"),
  description: yup.string().required("Descrição da organização obrigatória"),
});

export default function Register() {
  const { signIn } = useContext(AuthContext);
  hotjar.event("button-click");

  const {
    register,
    handleSubmit,
    formState,
    setError,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createOrganizationFormSchema),
  });

  const handleCreateOrganization: SubmitHandler<
    CreateOrganizationFormData
  > = async (values) => {
    let phones = [];
    if (!values.organizationTypeId) {
      setError("organizationTypeId", {
        type: "manual",
        message: "Escolha um tipo de entidade",
      });
    }

    if (!values.cityId) {
      setError("cityId", {
        type: "manual",
        message: "Escolha um tipo de entidade",
      });
    }

    if (values.phone) {
      phones.push({
        number: values.phone,
        is_whatsapp: false,
      });
    }

    if (values.cellphone) {
      phones.push({
        number: values.cellphone,
        is_whatsapp: true,
      });
    }

    await api
      .post("/organizations/user", {
        user: {
          name: values.name,
          email: values.email,
          password: values.password,
          is_volunteer: false,
          avatar: values.avatarUser,
        },

        organization: {
          name: values.nameOrganization,
          email: values.emailOrganization,
          description: values.description,
          cnpj: values.cnpj.replace(/[^0-9]/g, ""),
          organization_type_id: values.organizationTypeId,
          avatar: values.avatarOrganization,
          address: {
            street: values.street,
            number: values.number,
            complement: values.complement,
            district: values.district,
            city_id: Number(values.cityId),
          },
          phones,
        },
      })
      .then(async (respnse) => {
        await signIn({ email: values.email, password: values.password });
      })
      .catch((error) => {
        if (error?.response?.data?.message) {
          const errorMessage = error.response.data.message;
          if (errorMessage === "User email is already registered!") {
            setError("email", {
              type: "manual",
              message: "E-mail já está cadastrado",
            });
          }
          if (errorMessage === "Organization cnpj is already registered!") {
            setError("cnpj", {
              type: "manual",
              message: "CNPJ já está cadastrado",
            });
          }
          if (errorMessage === "Organization email is already registered!") {
            setError("emailOrganization", {
              type: "manual",
              message: "E-mail já está cadastrado",
            });
          }
        }
      });
  };

  return (
    <Box w="100%" minW={1440}>
      <Header />
      <Flex as="form" onSubmit={handleSubmit(handleCreateOrganization)}>
        <Stack spacing="5" justify="space-between" w={1160} mt={5} mx="auto">
          <Text fontSize="3xl">Cadastro de Organização</Text>

          <CreateUser
            register={register}
            errors={errors}
            setValue={setValue}
            setError={setError}
          />
          <CreateOrganization
            register={register}
            errors={errors}
            setValue={setValue}
            setError={setError}
          />
          <CreateAddress
            register={register}
            errors={errors}
            setValue={setValue}
          />
          <Flex justify="center">
            {Object.keys(errors).length > 0 && (
              <Text color="red">
                Há Erros nos dados informados, revise e tente novamente
              </Text>
            )}
          </Flex>
          <Flex p={4}>
            <Button
              type="submit"
              mx="auto"
              title="Enviar Cadastro"
              isLoading={formState.isSubmitting}
            />
          </Flex>
        </Stack>
      </Flex>
    </Box>
  );
}
