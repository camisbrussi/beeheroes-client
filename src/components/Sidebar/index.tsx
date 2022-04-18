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
  useBreakpointValue,
} from "@chakra-ui/react";

import { SideBarNav } from "./SidebarNav";
import { RiMenuFill } from "react-icons/ri";

export function Sidebar() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex mx={5}>
        <IconButton
          aria-label="Open Navigation"
          icon={<Icon as={RiMenuFill} />}
          fontSize="24px"
          variant="unstyled"
          onClick={onOpen}
          mt="2"
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
