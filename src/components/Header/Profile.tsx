import {
  Flex,
  Box,
  Text,
  Avatar,
  Link,
  Spacer,
  Menu,
  MenuButton,
} from "@chakra-ui/react";
import { useContext, useMemo } from "react";
import { AuthContext } from "../../context/AuthContext";
import { MenuProfile } from "./MenuProfile";

export function Profile() {
  const { user } = useContext(AuthContext);

  const userProfile = useMemo(
    () => (
      <Flex align="center">
        {user?.name ? (
          <Menu>
            <MenuButton>
              <Avatar
                size="md"
                name={user?.name}
                src={
                  user?.avatar
                    ? `${process.env.NEXT_PUBLIC_AWS_BUCKET_URL}/avatar/${user?.avatar}`
                    : null
                }
              />
            </MenuButton>
            <MenuProfile />
          </Menu>
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
