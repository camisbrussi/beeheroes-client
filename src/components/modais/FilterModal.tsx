import {
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Select } from "../FormsComponents/Select";
import { api } from "../../services/apiCLient";
import { Button } from "../Button";
import Router from "next/router";

export function FilterModal({ onClose, slug, query }) {
  console.log(query.state_id);
  const [stateId, setStateId] = useState(query.state_id || null);
  const [cityId, setCityId] = useState(query.city_id || null);
  const [organizationTypeId, setOrganizationTypeId] = useState(
    query.organizationTypeId || null
  );

  const [cities, setCities] = useState(null);
  const [states, setState] = useState(null);
  const [organizationTypes, setOrganizationTypes] = useState();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  useEffect(() => {
    async function getData() {
      await api.get(`/cities/states`).then((response) => {
        setState(response.data);
      });
    }

    getData();
  }, []);

  const applyFilter = async () => {
    let statusExpression = "";

    let cityExpression = "";
    if (cityId) {
      cityExpression = `&city_id=${cityId}`;
    }

    let stateExpression = "";
    if (stateId) {
      stateExpression = `&state_id=${stateId}`;
    }

    let organizationTypeExpression = "";
    if (organizationTypeId) {
      organizationTypeExpression = `&organization_type_id=${organizationTypeId}`;
    }

    Router.push(
      `${slug}?${statusExpression}${cityExpression}${stateExpression}${organizationTypeExpression}`
    );
    onClose();
  };

  useEffect(() => {
    async function getData() {
      await api.get(`/organizationtypes`).then((response) => {
        setOrganizationTypes(response.data);
      });
    }

    getData();
  }, []);

  useEffect(() => {
    setCities(null);
    async function getData() {
      await api.get(`/cities?id=${stateId}`).then((response) => {
        setCities(response.data);
      });
    }
    stateId && getData();
  }, [stateId]);

  return (
    <ModalContent>
      <ModalHeader>Criar Filtro</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Stack
          spacing="8"
          w={500}
          mx="auto"
          bg="white"
          padding="10"
          borderRadius="10"
        >
          <Select
            name="state"
            id="state"
            placeholder="Escolha um Estado"
            label="Estado"
            data={states}
            value={stateId}
            onChange={(e) => setStateId(e.target.value)}
          />
          <Select
            name="city"
            id="city"
            placeholder="Escolha uma cidade"
            isDisabled={cities ? false : true}
            label="Cidade"
            data={cities ? cities : []}
            value={cityId}
            onChange={(e) => setCityId(e.target.value)}
          />
          {slug !== "volunteers" && (
            <Select
              name="organization_type"
              id="organization_type"
              placeholder="Escolha um Tipo de Organização"
              label="Tipo de Organização"
              data={organizationTypes}
              value={organizationTypeId}
              onChange={(e) => setOrganizationTypeId(e.target.value)}
            />
          )}
          <Button title="Aplicar Filtro" onClick={applyFilter} />
        </Stack>
      </ModalBody>
    </ModalContent>
  );
}
