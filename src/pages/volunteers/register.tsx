import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { hotjar } from "react-hotjar";

import { Button } from "../../components/Button";
import CreateUser from "../../components/forms/CreateUser";
import { Header } from "../../components/Header";
import { api } from "../../services/apiCLient";
import { useContext, useLayoutEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import CreateVolunteer from "../../components/forms/CreateVolunteer";
import CreateAddressUser from "../../components/forms/CreateAddressUser";
import { CreateVolunteerFormData } from "../../@types/volunteer";

const createVolunteerFormSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: yup
    .string()
    .required("Senha obrigatória")
    .min(6, "No mínimo 6 caracteres"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Senhas não conferem"),
});

export default function RegisterVolunteer() {
  useLayoutEffect(() => {
    hotjar.initialize(2953049, 6);

    hotjar.event("button-click");
  }, []);

  const { signIn } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState,
    setError,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createVolunteerFormSchema),
  });

  const handleCreateVolunteer: SubmitHandler<CreateVolunteerFormData> = async (
    values
  ) => {
    if (!values.cityId) {
      setError("cityId", {
        type: "manual",
        message: "Escolha uma cidade",
      });
    }

    if (!values.occupationAreaId) {
      setError("occupationAreaId", {
        type: "manual",
        message: "Escolha uma área de atuação",
      });
    }
    await api
      .post("/volunteers/user", {
        user: {
          name: values.name,
          email: values.email,
          password: values.password,
          avatar: values.avatarUser,
          address: {
            city_id: Number(values.cityId),
          },
        },
        volunteer: {
          description: values.description,
          occupation_area_id: values.occupationAreaId,
        },
      })
      .then(async () => {
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
        }
      });
  };

  return (
    <Box w="100%" minW={1440}>
      <Header />
      <Flex as="form" onSubmit={handleSubmit(handleCreateVolunteer)}>
        <Stack spacing="5" justify="space-between" w={1160} mt={5} mx="auto">
          <Text fontSize="3xl">Cadastro de Voluntário</Text>
          <CreateUser
            register={register}
            errors={errors}
            setValue={setValue}
            setError={setError}
          />
          <CreateVolunteer
            register={register}
            errors={errors}
            setValue={setValue}
          />
          <CreateAddressUser
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
