import {
  Flex,
  Stack,
  Text,
  Spacer,
  useBreakpointValue,
  Box,
} from "@chakra-ui/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";

import { Logo } from "../components/Logo";
import { Input } from "../components/FormsComponents/Input";
import { Button } from "../components/Button";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { GetServerSideProps } from "next";
import { withSSRGuest } from "../utils/withSSRGuest";
import { SignInFormData } from "../@types/signIn";
import { Header } from "../components/Header";

const signInFormSchema = yup.object().shape({
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: yup.string().required("Senha obrigatória"),
});

export default function SigIn() {
  const {
    register,
    handleSubmit,
    formState,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const { signIn } = useContext(AuthContext);

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    try {
      await signIn(values);
    } catch (err) {
      setError("email", {
        type: "manual",
        message: "Senha ou e-mail incorreto",
      });
    }
  };

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
  return (
    <Box w="100%">
      <Header />
      <Flex
        w="100vw"
        h="100vh"
        align="center"
        justify="center"
        flexDir={!isWideVersion ? "column" : "row"}
      >
        <Logo />
        <Flex
          as="form"
          width="100%"
          maxW={isWideVersion ? "500" : "300"}
          bg="white"
          p="8"
          borderRadius={8}
          m={isWideVersion ? "60px" : "20px"}
          flexDir="column"
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Stack spacing="4">
            <Text fontSize="2xl" as="b">
              Fazer Login
            </Text>
            <Input
              name="email"
              type="email"
              label="E-mail"
              error={errors.email}
              {...register("email")}
            />
            <Input
              name="password"
              type="password"
              label="Senha"
              error={errors.password}
              {...register("password")}
            />
            <Stack direction={["column", "row"]}>
              <Link href="/">Esqueci minha Senha</Link>
              <Spacer />
              <Link href="/"> Continuar sem login</Link>
            </Stack>
          </Stack>

          <Button
            mt="6"
            type="submit"
            title="Entrar"
            isLoading={formState.isSubmitting}
          />
        </Flex>
      </Flex>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRGuest(
  async (ctx) => {
    return {
      props: {},
    };
  }
);
