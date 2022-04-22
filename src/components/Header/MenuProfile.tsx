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
      <MenuList minWidth={300}>
        <MenuGroup title="Perfil">
          <Stack align="center" spacing="2" mt={1} p={5}>
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
            <Button
              border="1px"
              onClick={() => Router.push(`/users/profile/${user.id}`)}
            >
              Visualizar perfil
            </Button>
          </Stack>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup title="Conta">
          <MenuItem
            as={Button}
            onClick={() => Router.push(`/users/edit/${user?.id}`)}
          >
            Editar
          </MenuItem>

          <MenuItem as={Button} onClick={signOut} mt={2}>
            Sair
          </MenuItem>
        </MenuGroup>
      </MenuList>
    ),
    [signOut, user]
  );

  return <> {userProfile}</>;
}
