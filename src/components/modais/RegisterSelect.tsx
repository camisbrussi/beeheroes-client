import {
  RadioGroup,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  Stack,
} from "@chakra-ui/react";
import Router from "next/router";
import { useState } from "react";
import { Button } from "../Button";

export function RegisterSelect() {
  const [value, setValue] = useState("1");

  function handleSubmit() {
    if (value === "1") {
      Router.push("/organization/register");
    } else {
      Router.push("/volunteer/register");
    }
  }
  return (
    <>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Fazer Cadastro</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <RadioGroup onChange={setValue} value={value}>
            <Stack direction="column">
              <Radio mt={5} colorScheme="yellow" value="1">
                Quero fazer o cadastro de uma organização
              </Radio>
              <Radio colorScheme="yellow" value="2">
                Quero ser um voluntário
              </Radio>
            </Stack>
          </RadioGroup>
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={handleSubmit}
            mx="auto"
            mt={10}
            title="Seguir para o Cadastro"
          />
        </ModalFooter>
      </ModalContent>
    </>
  );
}
