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
import { useRef } from "react";

import { SideBarNav } from "./SidebarNav";
import { CgMenuGridR } from "react-icons/cg";
import { RiMenuLine } from "react-icons/ri";

export function Sidebar() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <>
      <Flex mx="20px" left={["16px", "40px"]}>
        <Button
          aria-label="Open Navigation"
          leftIcon={<Icon as={RiMenuLine} />}
          fontSize="18px"
          variant="unstyled"
          onClick={onOpen}
          mt="2"
        >
          {isWideVersion && "Menu"}
        </Button>
      </Flex>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
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
