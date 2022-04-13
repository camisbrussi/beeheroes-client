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

import { api } from "../../services/apiCLient";
import { CreateSubscription } from "../../@types/subscriptions";
import { Button } from "../Button";
import { useState } from "react";

export function SubscriptionModal({
  projectId,
  userId,
  onCloseModal,
}: CreateSubscription) {
  const [message, setMessage] = useState(
    " Se você quer se canditar para o projeto, confirme abaixo. A organização irá realizar uma análise e fará contato."
  );
  const [textButton, setTextButton] = useState("Confirmar");
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const confirmSubscription = async () => {
    await api
      .post("/subscriptions", {
        project_id: projectId,
        user_id: userId,
      })
      .then(async () => {
        setMessage("Inscrição realizada com sucesso!");
        setTextButton("Fechar");
      })
      .catch((error) => {
        if (error?.response?.data?.message) {
          const errorMessage = error.response.data.message;
          if (errorMessage === "Subscription already exists!") {
            setMessage("Você já está inscrito nesse projeto!");
            setTextButton("Fechar");
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
          <Text align="center" mt={5}>
            {message}
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={
              textButton === "Confirmar" ? confirmSubscription : onCloseModal
            }
            mx="auto"
            mt={10}
            title={textButton}
          />
        </ModalFooter>
      </ModalContent>
    </>
  );
}
