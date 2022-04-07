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
  Modal,
  useDisclosure,
} from "@chakra-ui/react";

import { api } from "../../services/apiCLient";
import { CreateSubscription } from "../../@types/subscriptions";
import { Button } from "../Button";
import { useState } from "react";
import { SubscriptionModalConfirm } from "./SubscriptionModalConfirm";

export function SubscriptionModal({ projectId, userId }: CreateSubscription) {
  const [message, setMessage] = useState("");
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const confirmSubscription = async () => {
    console.log(projectId, userId);
    await api
      .post("/subscriptions", {
        project_id: projectId,
        user_id: userId,
      })
      .then(async () => {
        setMessage("Inscrição realizada com sucesso!");
      })
      .catch((error) => {
        if (error?.response?.data?.message) {
          const errorMessage = error.response.data.message;
          if (errorMessage === "Subscription already exists!") {
            setMessage("Você já está inscrito nesse projeto!");
          }
        }
      });
  };
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
          <Text align="center">
            Se você quer se canditar para o projeto, confirme abaixo. A
            organização irá realizar uma análise e fará contato.
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={confirmSubscription}
            mx="auto"
            mt={10}
            title="Confirmar"
          />
        </ModalFooter>
      </ModalContent>

      <Modal isOpen={isOpen} onClose={onClose}>
        <SubscriptionModalConfirm message={message} />
      </Modal>
    </>
  );
}
