import { useEffect } from "react";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import Router from "next/router";
import { hotjar } from "react-hotjar";

import { Button } from "../../../components/Button";
import { Header } from "../../../components/Header";
import { api } from "../../../services/apiCLient";

import { Organization } from "../../../@types/organization";
import { withSSRAuth } from "../../../utils/withSSRAuth";
import { EditProjectFormData } from "../../../@types/project";
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

export default function EditProject({ projectData }) {
  hotjar.event("button-click");

  const {
    register,
    handleSubmit,
    formState,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createProjectFormSchema),
  });

  useEffect(() => {
    setValue("name", projectData?.name, {
      shouldValidate: true,
    });
    setValue("description", projectData?.description, {
      shouldValidate: true,
    });
    setValue("start", projectData?.start || "", {
      shouldValidate: true,
    });
    setValue("end", projectData?.end || "", {
      shouldValidate: true,
    });
    setValue("vacancies", projectData?.vacancies || "", {
      shouldValidate: true,
    });
  }, [projectData, setValue]);

  const handleEditVolunteer: SubmitHandler<EditProjectFormData> = async (
    values
  ) => {
    let data: EditProjectFormData = {};
    projectData?.name !== values.name && (data.name = values.name);
    projectData?.description !== values.description &&
      (data.description = values.description);
    projectData?.start !== values.start && (data.start = values.start);
    projectData?.end !== values.end && (data.end = values.end);
    projectData?.vacancies !== values.vacancies &&
      (data.vacancies = values.vacancies);

    await api
      .put(`/projects?id=${projectData.id}`, {
        data,
      })
      .then(async () => {
        Router.push(`/project/${projectData.id}`);
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
          <Text fontSize="3xl">Edição dos dados do Projeto</Text>
          <CreateProject
            register={register}
            errors={errors}
            getValues={getValues}
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

export const getServerSideProps = withSSRAuth(async (ctx) => {
  let projectData = null;
  const { slug } = ctx.params;

  await api.get<Organization>(`/projects/find?id=${slug}`).then((response) => {
    projectData = response.data;
  });

  return {
    props: { projectData },
  };
}, {});
