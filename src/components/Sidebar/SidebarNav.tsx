import { Button, Icon, Stack } from "@chakra-ui/react";
import { useContext } from "react";

import {
  RiHandHeartLine,
  RiFundsLine,
  RiArrowLeftLine,
  RiParentLine,
  RiOpenArmLine,
  RiEdit2Line,
  RiLogoutCircleLine,
} from "react-icons/ri";
import { AuthContext } from "../../contexts/AuthContext";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SideBarNav() {
  const { user, signOut } = useContext(AuthContext);

  return (
    <Stack spacing="10" align="flex-start">
      {user && (
        <NavSection title="PRINCIPAL">
          <NavLink icon={RiArrowLeftLine} href="/">
            Voltar para o ínicio
          </NavLink>
          <Button
            onClick={signOut}
            bg="transparent"
            justifyContent="flex-start"
            padding="0"
            _hover={{ bg: "blue.50" }}
          >
            <Icon as={RiLogoutCircleLine} mx={2} />
            Logout
          </Button>
        </NavSection>
      )}

      <NavSection title="BUSCAS">
        <NavLink icon={RiOpenArmLine} href="/busca/organizations">
          Organizações
        </NavLink>
        <NavLink icon={RiFundsLine} href="/busca/projects">
          Projetos
        </NavLink>
        <NavLink icon={RiHandHeartLine} href="/busca/donations">
          Doações
        </NavLink>
        <NavLink icon={RiParentLine} href="/busca/volunteers">
          Voluntários
        </NavLink>
      </NavSection>
    </Stack>
  );
}
