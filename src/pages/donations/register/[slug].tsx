import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { hotjar } from "react-hotjar";

import { Button } from "../../../components/Button";
import { Header } from "../../../components/Header";
import { api } from "../../../services/apiCLient";
import Router from "next/router";
import { withSSRAuth } from "../../../utils/withSSRAuth";
import CreateDonation from "../../../components/forms/CreateDonation";
import { CreateDonationFormData } from "../../../@types/donation";

const createDonationFormSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  description: yup.string().required("Descrição da Doação é obrigatória"),
});

export default function Register({ slug }) {
  hotjar.event("button-click");

  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createDonationFormSchema),
  });

  const handleCreateOrganization: SubmitHandler<
    CreateDonationFormData
  > = async (values) => {
    let donation;

    await api
      .post("/donations", {
        name: values.name,
        description: values.description,
        total_value: values.totalValue,
        organization_id: slug,
      })
      .then(async (response) => {
        donation = response.data;
        Router.push(`/donations/${donation.id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box w="100%" minW={1440}>
      <Header />
      <Flex as="form" onSubmit={handleSubmit(handleCreateOrganization)}>
        <Stack spacing="5" justify="space-between" w={1160} mt={5} mx="auto">
          <Text fontSize="3xl">Cadastro de Doação</Text>

          <CreateDonation register={register} errors={errors} />
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

export const getServerSideProps = withSSRAuth(async ({ params }) => {
  const { slug } = params;
  return {
    props: {
      slug,
    },
  };
}, {});
