import { useEffect } from "react";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import Router from "next/router";

import { Button } from "../../../components/Button";
import CreateAddress from "../../../components/forms/CreateAddress";
import { Header } from "../../../components/Header";
import { api } from "../../../services/apiCLient";

import {
  CreateOrganizationFormData,
  EditOrganizationFormData,
  Organization,
} from "../../../@types/organization";
import { withSSRAuth } from "../../../utils/withSSRAuth";
import CreateOrganization from "../../../components/forms/CreateOrganization";

const createUserFormSchema = yup.object().shape({
  nameOrganization: yup.string().required("Nome obrigatório"),
  emailOrganization: yup
    .string()
    .required("E-mail obrigatório")
    .email("E-mail inválido"),
  cnpj: yup.string().required("CNPJ obrigatório"),
  description: yup.string().required("Descrição da organização obrigatória"),
});

export default function EditOrganization({ organizationData }) {
  const {
    register,
    handleSubmit,
    formState,
    setError,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createUserFormSchema),
  });

  useEffect(() => {
    setValue("nameOrganization", organizationData?.name, {
      shouldValidate: true,
    });
    setValue("emailOrganization", organizationData?.email, {
      shouldValidate: true,
    });
    setValue("avatarOrganization", organizationData?.avatar || "", {
      shouldValidate: true,
    });
    setValue("cnpj", organizationData?.cnpj || "", {
      shouldValidate: true,
    });
    setValue(
      "organizationTypeId",
      organizationData.organization_type?.id || "",
      {
        shouldValidate: true,
      }
    );
    setValue("description", organizationData?.description || "", {
      shouldValidate: true,
    });
    setValue("stateId", organizationData?.address?.city?.state?.id || "", {
      shouldValidate: true,
    });
    setValue("cityId", organizationData?.address?.city?.id || "", {
      shouldValidate: true,
    });
    setValue("street", organizationData?.address?.street || "", {
      shouldValidate: true,
    });
    setValue("cityId", organizationData?.address?.city?.id || "", {
      shouldValidate: true,
    });
  }, [organizationData, setValue]);

  const handleEditVolunteer: SubmitHandler<CreateOrganizationFormData> = async (
    values
  ) => {
    if (values.organizationTypeId === "") {
      setError("organizationTypeID", {
        type: "manual",
        message: "Escolha um tipo",
      });
    }

    let data: EditOrganizationFormData = {};
    organizationData?.name !== values.nameOrganization &&
      (data.name = values.nameOrganization);
    organizationData?.email !== values.emailOrganization &&
      (data.email = values.emailOrganization);
    organizationData?.avatar !== values.avatarOrganization &&
      (data.avatar = values.avatarOrganization);
    organizationData?.organization_type?.id !== values.organizationTypeId &&
      (data.organizationTypeId = values.organizationTypeId);
    organizationData?.description !== values.description &&
      (data.description = values.description);
    data.address = { city_id: Number(values.cityId) };
    organizationData?.street !== values.street &&
      (data.address.street = values.street);
    organizationData?.number !== values.number &&
      (data.address.number = values.number);
    organizationData?.complement !== values.complement &&
      (data.address.complement = values.complement);
    organizationData?.district !== values.district &&
      (data.address.district = values.district);
    organizationData?.cep !== values.cep && (data.address.cep = values.cep);
    organizationData?.cnpj !== values.cnpj && (data.cnpj = values.cnpj);
    organizationData?.description !== values.description &&
      (data.description = values.description);

    await api
      .put(`/organizations?id=${organizationData.id}`, {
        data,
      })
      .then(async () => {
        Router.push(`/project/${organizationData.id}`);
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
      <Flex as="form" onSubmit={handleSubmit(handleEditVolunteer)}>
        <Stack spacing="5" justify="space-between" w={1160} mt={5} mx="auto">
          <Text fontSize="3xl">Edição dos dados da Organização</Text>
          <CreateOrganization
            register={register}
            errors={errors}
            setValue={setValue}
            setError={setError}
            getValues={getValues}
            isEdit
          />
          <CreateAddress
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
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

export const getServerSideProps = withSSRAuth(async (ctx) => {
  let organizationData = null;
  const { slug } = ctx.params;

  await api
    .get<Organization>(`/organizations/find?id=${slug}`)
    .then((response) => {
      organizationData = response.data;
    });

  return {
    props: { organizationData },
  };
}, {});
