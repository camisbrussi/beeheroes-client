import {
  Flex,
  Avatar,
  Link,
  Spacer,
  Menu,
  MenuButton,
  Modal,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { useContext, useMemo } from "react";
import { AuthContext } from "../../context/AuthContext";
import { RegisterSelect } from "../modais/RegisterSelect";
import { MenuProfile } from "./MenuProfile";

export function Profile() {
  const { user } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
            <Button
              onClick={onOpen}
              fontWeight="bold"
              variant="link"
              color="blue.600"
            >
              Fazer Cadastro
            </Button>
          </Flex>
        )}
        <Modal isOpen={isOpen} onClose={onClose}>
          <RegisterSelect />
        </Modal>
      </Flex>
    ),
    [isOpen, onClose, onOpen, user]
  );

  return <> {userProfile}</>;
}
