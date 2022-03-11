import {
  Button,
  Flex,
  Stack,
  FormControl,
  Text,
  Link,
  Checkbox,
  Spacer,
  useBreakpointValue,
} from "@chakra-ui/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";

import { Logo } from "../components/Logo";
import { Input } from "../components/Input";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { GetServerSideProps } from "next";
import { withSSRGuest } from "../utils/withSSRGuest";

type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: yup.string().required("Senha obrigatória"),
});

export default function SigIn() {
  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const { signIn } = useContext(AuthContext);

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    await signIn(values);
  };

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
  return (
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
        m="100"
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Text fontSize="2xl" as="b">
            Fazer Login
          </Text>
          <FormControl>
            <Input
              name="email"
              type="email"
              label="E-mail"
              error={errors.email}
              {...register("email")}
            />
          </FormControl>
          <FormControl>
            <Input
              name="password"
              type="password"
              label="Senha"
              error={errors.password}
              {...register("password")}
            />
          </FormControl>
          <Stack direction={["column", "row"]}>
            <Checkbox colorScheme="yellow">Lembrar-me</Checkbox>
            <Spacer />
            <Link>Esqueci minha Senha</Link>
          </Stack>
        </Stack>

        <Button
          type="submit"
          mt="6"
          colorScheme="yellow"
          size="lg"
          color="brown.600"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRGuest(
  async (ctx) => {
    return {
      props: {},
    };
  }
);
