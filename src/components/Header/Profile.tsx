import { Flex, Box, Text, Avatar, Link, Spacer } from "@chakra-ui/react";
import { useContext, useMemo } from "react";
import { AuthContext } from "../../context/AuthContext";

export function Profile() {
  const { user } = useContext(AuthContext);

  const userProfile = useMemo(
    () => (
      <Flex align="center">
        {user?.name ? (
          <Link href="/profile">
            <Flex>
              <Box mr="4" textAlign="right">
                <Text>{user?.name}</Text>
                <Text color="brown.600" fontSize="small">
                  {user?.email}
                </Text>
              </Box>
              <Avatar
                size="md"
                name={user?.name}
                src={
                  user?.avatar
                    ? `${process.env.NEXT_PUBLIC_AWS_BUCKET_URL}/avatar/${user?.avatar}`
                    : null
                }
              />
            </Flex>
          </Link>
        ) : (
          <Flex>
            <Link href="/signin" fontWeight="bold" p="4">
              Fazer Login
            </Link>
            <Spacer />
            <Link href="/signin" fontWeight="bold" p="4">
              Fazer Cadastro
            </Link>
          </Flex>
        )}
      </Flex>
    ),
    [user]
  );

  return <> {userProfile}</>;
}
