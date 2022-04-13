import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";

import { Button } from "../../../components/Button";
import { Header } from "../../../components/Header";
import { api } from "../../../services/apiCLient";
import { CreateProjectFormData } from "../../../@types/project";
import Router from "next/router";
import { withSSRAuth } from "../../../utils/withSSRAuth";
import CreateProject from "../../../components/forms/CreateProject";

const createProjectFormSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  description: yup.string().required("Descrição do projeto obrigatória"),
  start: yup.date().required("Data de início obrigatória"),
  end: yup
    .date()
    .min(
      yup.ref("start"),
      "Data de término deve ser maior que a data de início"
    ),
  vacancies: yup
    .number()
    .required("Caso não houver limite de vagas preencha com 0"),
});

export default function Register({ slug }) {
  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createProjectFormSchema),
  });

  const handleCreateProject: SubmitHandler<CreateProjectFormData> = async (
    values
  ) => {
    let project;

    await api
      .post("/projects", {
        name: values.name,
        description: values.description,
        start: values.start,
        end: values.end,
        vacancies: values.vacancies,
        organization_id: slug,
      })
      .then(async (response) => {
        project = response.data;
        Router.push(`/project/${project.id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box w="100%" minW={1440}>
      <Header />
      <Flex as="form" onSubmit={handleSubmit(handleCreateProject)}>
        <Stack spacing="5" justify="space-between" w={1160} mt={5} mx="auto">
          <Text fontSize="3xl">Cadastro de Projeto</Text>

          <CreateProject register={register} errors={errors} />
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
