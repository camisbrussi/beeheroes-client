import { useEffect } from "react";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import Router from "next/router";

import { Button } from "../../../components/Button";
import { Header } from "../../../components/Header";
import { api } from "../../../services/apiCLient";

import { Organization } from "../../../@types/organization";
import { withSSRAuth } from "../../../utils/withSSRAuth";
import {
  CreateDonationFormData,
  EditDonationFormData,
} from "../../../@types/donation";
import CreateDonation from "../../../components/forms/CreateDonation";

const createDonationFormSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  description: yup.string().required("Descrição da Doação é obrigatória"),
});

export default function EditDonation({ donationData }) {
  const {
    register,
    handleSubmit,
    formState,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createDonationFormSchema),
  });
  useEffect(() => {
    setValue("name", donationData?.name, {
      shouldValidate: true,
    });

    setValue("description", donationData?.description, {
      shouldValidate: true,
    });
    setValue("totalValue", donationData?.total_value, {
      shouldValidate: true,
    });
    setValue("totalCollected", donationData?.total_collected, {
      shouldValidate: true,
    });
    setValue("status", donationData?.status, {
      shouldValidate: true,
    });
  }, [donationData, setValue]);

  const handleEditVolunteer: SubmitHandler<CreateDonationFormData> = async (
    values
  ) => {
    let data: EditDonationFormData = {};
    donationData?.name !== values.name && (data.name = values.name);
    donationData?.description !== values.description &&
      (data.description = values.description);
    donationData?.total_value !== values.totalValue &&
      (data.total_value = values.totalValue);
    donationData?.total_collected !== values.totalCollected &&
      (data.total_collected = values.totalCollected);
    donationData?.status !== values.status && (data.status = values.status);

    await api
      .put(`/donations?id=${donationData.id}`, {
        data,
      })
      .then(async () => {
        Router.push(`/donation/${donationData.id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box w="100%" minW={1440}>
      <Header />
      <Flex as="form" onSubmit={handleSubmit(handleEditVolunteer)}>
        <Stack spacing="5" justify="space-between" w={1160} mt={5} mx="auto">
          <Text fontSize="3xl">Edição dos dados da Solicitação de Doação</Text>
          <CreateDonation
            register={register}
            errors={errors}
            getValues={getValues}
            setValue={setValue}
            isEdit
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
  let donationData = null;
  const { slug } = ctx.params;

  await api.get<Organization>(`/donations/find?id=${slug}`).then((response) => {
    donationData = response.data;
  });

  return {
    props: { donationData },
  };
}, {});
