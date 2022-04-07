import {
  Text,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";
import { SubscriptionMessageConfirmation } from "../../@types/subscriptions";

import { Button } from "../Button";

export function SubscriptionModalConfirm({
  message,
}: SubscriptionMessageConfirmation) {
  console.log(message);
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Fazer Inscrição</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Image
            src="/images/logo.svg"
            alt="logo"
            m="auto"
            w={isWideVersion ? "184" : "50"}
          />
          <Text align="center">{message}</Text>
        </ModalBody>

        <ModalFooter>
          <Button onClick={this.onClose} mx="auto" mt={10} title="Confirmar" />
        </ModalFooter>
      </ModalContent>
    </>
  );
}
