import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  Button,
  Icon,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { useRef } from "react";

import { SideBarNav } from "./SidebarNav";
import { CgMenuGridR } from "react-icons/cg";
import { ProfileMenu } from "./ProfileMenu";

export function Sidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <>
      <Flex justify="end" mt="10" mx="230px" left={["16px", "40px"]}>
        <ProfileMenu />
        <IconButton
          mx={5}
          aria-label="Menu"
          ref={btnRef}
          onClick={onOpen}
          colorScheme="yellow"
          size="lg"
          color="brown.600"
          border-radius="full"
          icon={<Icon as={CgMenuGridR} mx={2} />}
        />
      </Flex>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent p="4">
            <DrawerCloseButton mt="6" />
            <DrawerHeader>Navegação</DrawerHeader>
            <DrawerBody>
              <SideBarNav />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}
