import { Button, Icon, Modal, Stack, useDisclosure } from "@chakra-ui/react";
import { useContext } from "react";

import {
  RiHandHeartLine,
  RiFundsLine,
  RiArrowLeftLine,
  RiParentLine,
  RiOpenArmLine,
  RiLoginCircleLine,
  RiLogoutCircleLine,
  RiHeart3Line,
} from "react-icons/ri";
import { AuthContext } from "../../context/AuthContext";
import { RegisterSelect } from "../modais/RegisterSelect";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SideBarNav() {
  const { user } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Stack spacing="10" align="flex-start">
      <NavSection title="PRINCIPAL">
        {user ? (
          <>
            <NavLink icon={RiArrowLeftLine} href="/">
              Voltar para o ínicio
            </NavLink>
          </>
        ) : (
          <>
            <NavLink icon={RiLoginCircleLine} href="/signin">
              Fazer Login
            </NavLink>
            <Button onClick={onOpen} variant="link">
              <Icon as={RiHeart3Line} mx={2} />
              Fazer Cadastro
            </Button>
          </>
        )}
      </NavSection>

      <NavSection title="BUSCAS">
        <NavLink icon={RiOpenArmLine} href="/busca/organizations?status=1">
          Organizações
        </NavLink>
        <NavLink icon={RiFundsLine} href="/busca/projects?status=1">
          Projetos
        </NavLink>
        <NavLink icon={RiHandHeartLine} href="/busca/donations?status=1">
          Doações
        </NavLink>
        <NavLink icon={RiParentLine} href="/busca/volunteers?status=1">
          Voluntários
        </NavLink>
      </NavSection>
      <Modal isOpen={isOpen} onClose={onClose}>
        <RegisterSelect />
      </Modal>
    </Stack>
  );
}
