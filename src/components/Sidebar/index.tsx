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
import { ProfileMenu } from "./ProfileMenu";
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
      <Flex justify="end" mt="10" mx="230px" left={["16px", "40px"]}>
        {isWideVersion && <ProfileMenu />}
        <IconButton
          mx={5}
          aria-label="Menu"
          ref={btnRef}
          onClick={onOpen}
          colorScheme={isWideVersion ? "yellow" : ""}
          size="lg"
          color="brown.600"
          border-radius="full"
          icon={<Icon as={RiMenuLine} mx={2} />}
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
