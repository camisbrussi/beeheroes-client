import { useContext, useEffect, useLayoutEffect } from "react";

import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import Router from "next/router";
import { hotjar } from "react-hotjar";

import { EditUserFormData, User } from "../../../@types/user";
import { CreateVolunteerFormData } from "../../../@types/volunteer";
import { Header } from "../../../components/Header";
import { api } from "../../../services/apiCLient";
import { withSSRAuth } from "../../../utils/withSSRAuth";
import CreateUser from "../../../components/forms/CreateUser";
import { Button } from "../../../components/Button";
import CreateAddressUser from "../../../components/forms/CreateAddressUser";
import { AuthContext } from "../../../context/AuthContext";

interface EditUserProps {
  userData: User;
}

const createUserFormSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: yup.string(),
});

export default function EditVolunteer({ userData }: EditUserProps) {
  useLayoutEffect(() => {
    hotjar.event("button-click");
  }, []);

  const { signOut } = useContext(AuthContext);

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
    setValue("name", userData?.name, { shouldValidate: true });
    setValue("email", userData?.email, { shouldValidate: true });
    setValue("avatarUser", userData?.avatar, { shouldValidate: true });
    setValue("stateId", userData?.address?.city?.state?.id, {
      shouldValidate: true,
    });
    setValue("cityId", userData?.address?.city?.id, { shouldValidate: true });
  }, [userData, setValue]);

  const handleEditUser: SubmitHandler<CreateVolunteerFormData> = async (
    values
  ) => {
    if (!values.cityId) {
      setError("cityId", {
        type: "manual",
        message: "Escolha uma cidade",
      });
    }

    if (values.password && values.password.length < 6) {
      setError("password", {
        type: "manual",
        message: "Senha deve ter no mínimo 6 caracteres",
      });
    }
    if (values.password && values.password != values.passwordConfirmation) {
      setError("passwordConfirmation", {
        type: "manual",
        message: "Senhas não conferem",
      });
    } else {
    }

    let data: EditUserFormData = {};
    userData?.name !== values.name && (data.name = values.name);
    userData?.email !== values.email && (data.email = values.email);
    values.password && (data.password = values.password);
    userData?.address?.city?.id !== values.cityId &&
      (data.address = { city_id: Number(values.cityId) });
    userData?.avatar !== values.avatarUser && (data.avatar = values.avatarUser);

    await api
      .put("/users", {
        data,
      })
      .then(async () => {
        if (userData?.email !== values.email) {
          signOut();
          window.alert("Necessário realizar login com o novo e-mail");
        } else {
          Router.push(`/users/profile/${userData.id}`);
        }
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
      <Flex as="form" onSubmit={handleSubmit(handleEditUser)}>
        <Stack spacing="5" justify="space-between" w={1160} mt={5} mx="auto">
          <Text fontSize="3xl">Edição de dados</Text>
          <CreateUser
            register={register}
            errors={errors}
            setValue={setValue}
            setError={setError}
            getValues={getValues}
            isEdit
          />
          <CreateAddressUser
            register={register}
            errors={errors}
            getValues={getValues}
            setValue={setValue}
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
  let userData = null;
  const { slug } = ctx.params;

  await api.get<User>(`/users/find?id=${slug}`).then((response) => {
    userData = response.data;
  });

  return {
    props: { userData },
  };
}, {});
