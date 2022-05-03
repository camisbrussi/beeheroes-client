import { useEffect, useLayoutEffect } from "react";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import Router from "next/router";
import { hotjar } from "react-hotjar";

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
import { Phone } from "../../../@types/phone";

const createOrganizationFormSchema = yup.object().shape({
  nameOrganization: yup.string().required("Nome obrigatório"),
  emailOrganization: yup
    .string()
    .required("E-mail obrigatório")
    .email("E-mail inválido"),
  cnpj: yup.string().required("CNPJ obrigatório"),
  description: yup.string().required("Descrição da organização obrigatória"),
});

export default function EditOrganization({ organizationData }) {
  useLayoutEffect(() => {
    hotjar.initialize(2953049, 6);

    hotjar.event("button-click");
  }, []);

  const {
    register,
    handleSubmit,
    formState,
    setError,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createOrganizationFormSchema),
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
      organizationData?.organization_type?.id || "",
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
    organizationData?.phones?.map((phone) => {
      phone.is_whatsapp
        ? setValue("cellphone", phone || "", {
            shouldValidate: true,
          })
        : setValue("phone", phone || "");
    });
  }, [getValues, organizationData, setValue]);

  const handleEditVolunteer: SubmitHandler<CreateOrganizationFormData> = async (
    values
  ) => {
    let phones: Phone[] = [];
    if (values.organizationTypeId === "") {
      setError("organizationTypeID", {
        type: "manual",
        message: "Escolha um tipo",
      });
    }
    if (organizationData?.phone !== values.phone) {
      phones.push({
        number: values.phone,
        is_whatsapp: false,
      });
    }

    if (organizationData?.cellphone !== values.cellphone) {
      phones.push({
        number: values.cellphone,
        is_whatsapp: true,
      });
    }

    let data: EditOrganizationFormData = {};
    data.name = values.nameOrganization;
    organizationData.email !== values.emailOrganization &&
      (data.email = values.emailOrganization);
    data.avatar = values.avatarOrganization;
    data.organizationTypeId = values.organizationTypeId;
    data.description = values.description;
    data.address = { city_id: Number(values.cityId) };
    data.address.street = values.street;
    data.address.number = values.number;
    data.address.complement = values.complement;
    data.address.district = values.district;
    data.address.cep = values.cep;
    data.description = values.description;
    data.phones = phones;

    await api
      .put(`/organizations?id=${organizationData.id}`, {
        data,
      })
      .then(async () => {
        Router.push(`/organizations/${organizationData.id}`);
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
            getValues={getValues}
            setError={setError}
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
