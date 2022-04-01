import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";

import { Button } from "../../components/Button";
import { Footer } from "../../components/Footer";
import CreateUser from "../../components/forms/CreateUser";
import { Header } from "../../components/Header";
import { api } from "../../services/apiCLient";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import CreateVolunteer from "../../components/forms/CreateVolunteer";
import CreateAddressVolunteer from "../../components/forms/CreateAddressVolunteer";

type CreateUserInFormData = {
  name: string;
  email: string;
  avatar: string;
  password: string;
  passwordConfirmation: string;
  stateId: number;
  cityId: number;
  occupationAreaId: number;
  description: string;
  profession: string;
};

const createUserFormSchema = yup.object().shape({
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

export default function Register() {
  const { signIn } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState,
    setError,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createUserFormSchema),
  });

  const handleCreateUser: SubmitHandler<CreateUserInFormData> = async (
    values
  ) => {
    if (values.cityId) {
      setError("city", {
        type: "manual",
        message: "Escolha uma cidade",
      });
    } else if (values.occupationAreaId) {
      setError("occupationAreaId", {
        type: "manual",
        message: "Escolha uma área de atuação",
      });
    }
    console.log("values", values);
    console.log("values.avatar", values.avatar);
    await api
      .post("/volunteers/user", {
        user: {
          name: values.name,
          email: values.email,
          password: values.password,
          avatar: values.avatar,
          address: {
            city_id: Number(values.cityId),
          },
        },
        volunteer: {
          profession: values.profession,
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
      <Header hasBackButton />
      <Flex as="form" onSubmit={handleSubmit(handleCreateUser)}>
        <Stack spacing="5" justify="space-between" w={1160} mt={5} mx="auto">
          <Text fontSize="3xl">Cadastro de Voluntário</Text>
          <CreateUser
            register={register}
            errors={errors}
            setValue={setValue}
            setError={setError}
          />
          <CreateVolunteer register={register} errors={errors} />
          <CreateAddressVolunteer register={register} errors={errors} />

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
      <Footer />
    </Box>
  );
}
