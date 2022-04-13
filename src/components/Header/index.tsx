import { Flex, useBreakpointValue, IconButton, Icon } from "@chakra-ui/react";
import { Profile } from "./Profile";
import { Logo } from "./Logo";
import { useSidebarDrawer } from "../../context/SidebarDrawerContexts";
import { Sidebar } from "../Sidebar";

export function Header() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
  return (
    <Flex
      as="header"
      w={isWideVersion ? "100%" : "150%"}
      //maxWidth={1480}
      h={isWideVersion ? "65" : "30"}
      //mx="auto"
      align="center"
      px="20"
      justify="space-between"
      borderBottom="1px"
      borderColor="blue.600"
      bg="blue.100"
    >
      <Sidebar />
      <Logo />
      {isWideVersion && <Profile />}
    </Flex>
  );
}
