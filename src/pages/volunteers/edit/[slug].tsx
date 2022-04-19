import { useContext, useEffect } from "react";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Router from "next/router";

import {
  CreateVolunteerFormData,
  EditVolunteerFormData,
  Volunteer,
} from "../../../@types/volunteer";
import { Header } from "../../../components/Header";
import { api } from "../../../services/apiCLient";
import { withSSRAuth } from "../../../utils/withSSRAuth";
import { Button } from "../../../components/Button";
import CreateVolunteer from "../../../components/forms/CreateVolunteer";

interface EditVolunteerProps {
  volunteerData: Volunteer;
}

const createVolunteerFormSchema = yup.object().shape({
  occupationAreaId: yup.string(),
});

export default function EditVolunteer({ volunteerData }: EditVolunteerProps) {
  const {
    register,
    handleSubmit,
    formState,
    setError,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createVolunteerFormSchema),
  });

  useEffect(() => {
    setValue("description", volunteerData?.description, {
      shouldValidate: true,
    });
    setValue("occupationAreaId", volunteerData?.occupation_area.id, {
      shouldValidate: true,
    });
    setValue("profession", volunteerData?.profession, { shouldValidate: true });
  }, [volunteerData, setValue]);

  const handleEditUser: SubmitHandler<CreateVolunteerFormData> = async (
    values
  ) => {
    if (!values.occupationAreaId) {
      setError("occupationAreaId", {
        type: "manual",
        message: "Escolha uma área de atuação",
      });
    }

    let data: EditVolunteerFormData = {};
    volunteerData?.description !== values.description &&
      (data.description = values.description);
    volunteerData?.occupation_area.id !== values.occupationAreaId &&
      (data.occupation_area_id = values.occupationAreaId);
    volunteerData.profession && (data.profession = values.profession);

    await api
      .put(`/volunteers?id=${volunteerData.id}`, {
        data,
      })
      .then(async () => {
        Router.push(`/users/profile/${volunteerData.user.id}`);
      })
      .catch(async (error) => {});
  };

  return (
    <Box w="100%" minW={1440}>
      <Header />
      <Flex as="form" onSubmit={handleSubmit(handleEditUser)}>
        <Stack spacing="5" justify="space-between" w={1160} mt={5} mx="auto">
          <Text fontSize="3xl">Edição de dados</Text>
          <CreateVolunteer
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
            isEdit
          />

          <Flex p={4}>
            <Button
              type="submit"
              mx="auto"
              title="Editar Cadastro"
              isLoading={formState.isSubmitting}
            />
          </Flex>
        </Stack>
      </Flex>
    </Box>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  let volunteerData: Volunteer;
  const { slug } = ctx.params;

  await api.get<Volunteer>(`/volunteers/find/?id=${slug}`).then((response) => {
    volunteerData = response.data;
  });

  return {
    props: { volunteerData },
  };
}, {});
