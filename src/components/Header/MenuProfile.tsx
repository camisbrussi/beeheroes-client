import {
  Text,
  Avatar,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Stack,
  Button,
} from "@chakra-ui/react";
import Router from "next/router";
import { useContext, useMemo } from "react";
import { AuthContext } from "../../context/AuthContext";

export function MenuProfile() {
  const { user, signOut } = useContext(AuthContext);

  const userProfile = useMemo(
    () => (
      <MenuList>
        <Stack align="center" spacing="2" mt={1} p={6}>
          <Avatar
            size="xl"
            name={user?.name}
            src={
              user?.avatar
                ? `${process.env.NEXT_PUBLIC_AWS_BUCKET_URL}/avatar/${user?.avatar}`
                : null
            }
          />
          <Text>{user.name}</Text>
          <Text>{user.email}</Text>
        </Stack>
        <MenuItem as={Button} onClick={() => Router.push("/profile")}>
          Visualizar perfil
        </MenuItem>

        <MenuDivider />

        <MenuItem as={Button} onClick={signOut}>
          Sair da Conta
        </MenuItem>
      </MenuList>
    ),
    [signOut, user]
  );

  return <> {userProfile}</>;
}
