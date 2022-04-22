import { HStack, Stack, Text, Image, Flex } from "@chakra-ui/react";
import { User } from "../../@types/user";
interface InfoUserProps {
  data: User;
  isProfile?: boolean;
}

export function UserData({ data }: InfoUserProps) {
  return (
    <HStack spacing="10" w={1160} mt={20} mx="auto">
      <Image
        ml="10px"
        boxSize="125px"
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
          <Text fontSize="2xl">{data?.name} </Text>
        </Flex>

        <Text fontSize="md">E-mail: {data?.email}</Text>
        {data?.address?.city && (
          <Text>
            {data?.address?.city?.name}/{data?.address?.city?.state?.uf}
          </Text>
        )}
        <Flex justify="center"></Flex>
      </Stack>
      {data?.is_volunteer && (
        <Image src="/images/seal_vol.svg" alt="logo" m="auto" boxSize="125px" />
      )}
    </HStack>
  );
}
