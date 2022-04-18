import { HStack, Stack, Text, Image, Link, Tag, Flex } from "@chakra-ui/react";
import { useContext } from "react";
import { BooleanLocale } from "yup/lib/locale";
import { User } from "../../@types/user";
import { AuthContext } from "../../context/AuthContext";
interface InfoUserProps {
  data: User;
  isProfile?: boolean;
}

export function UserData({ data, isProfile }: InfoUserProps) {
  const { user } = useContext(AuthContext);
  return (
    <HStack spacing="20" w={1160} mt={20} mx="auto">
      <Image
        ml="10px"
        boxSize="250px"
        objectFit="cover"
        borderRadius="10"
        src={
          data?.avatar
            ? `${process.env.NEXT_PUBLIC_AWS_BUCKET_URL}/avatar/${data?.avatar}`
            : "/images/user.svg"
        }
        alt={data?.name}
      />

      <Stack>
        <Flex>
          <Text fontSize="5xl">{data?.name} </Text>
        </Flex>
        {data.is_volunteer ? (
          <Stack direction="row" justify="start" align="center">
            <Text fontSize="xl">Eu sou Voluntário</Text>
            <Image src="/images/logo.svg" alt="logo" m="auto" boxSize="50px" />
          </Stack>
        ) : (
          <Stack direction="row" justify="center" align="center">
            <Text fontSize="xl">Eu sou Responsável por uma entidade</Text>
            <Image
              src="/images/responsible.svg"
              alt="logo"
              m="auto"
              boxSize="50px"
            />
          </Stack>
        )}
        <Text fontSize="md">E-mail: {data?.email}</Text>
        {data?.address?.city && (
          <Text>
            {data?.address?.city?.name}/{data?.address?.city?.state?.uf}
          </Text>
        )}
        <Flex justify="center">
          {isProfile && (
            <Link href={`/users/edit/${user?.id}`}>
              <Tag mt={8} ml={3} colorScheme="yellow">
                Editar dados
              </Tag>
            </Link>
          )}
        </Flex>
      </Stack>
      {/* <Flex w={60}>
        <Image
          boxSize="100"
          src="/images/beemusic.svg"
          alt="logo"
          m="auto"
          w="184"
        />

        <Text>
          Você tem 1.000 pontos para trocar por cupons de desconto. Clique AQUI
          e troque
        </Text>
      </Flex> */}
    </HStack>
  );
}
