import {
  HStack,
  Stack,
  Text,
  Image,
  Tag,
  Link,
  Flex,
  Icon,
  Tooltip,
} from "@chakra-ui/react";
import { OrganizationProps } from "../../@types/organization";
import InputMask from "react-input-mask";
import { RiWhatsappFill } from "react-icons/ri";

interface InfoOrganizationProps {
  hasVisitButton?: boolean;
  data: OrganizationProps;
  isResponsible?: boolean;
}

export function OrganizationInfos({
  hasVisitButton = null,
  data,
  isResponsible = null,
}: InfoOrganizationProps) {
  const slug = data?.id;
  return (
    <HStack spacing="20" justify="space-between" w={1160} mx="auto">
      <Stack>
        <Text fontSize="5xl">
          {data?.name}
          {hasVisitButton && (
            <Link href={`/organizations/${slug}`}>
              <Tag mt={8} ml={3} colorScheme="yellow">
                Visitar Perfil
              </Tag>
            </Link>
          )}
          <Text fontSize="md">({data?.organization_type?.name}) </Text>
        </Text>

        <Text fontSize="lg">{data?.description}</Text>

        <Flex>
          <Text fontSize="md" fontWeight="bold">
            E-mail:
          </Text>
          <Text ml={1}>{data?.email}</Text>
        </Flex>

        {data?.address?.city && (
          <Flex>
            <Text fontSize="md" fontWeight="bold">
              Localização:
            </Text>
            <Text ml={1}>
              {data?.address?.city.name}/{data?.address?.city?.state?.uf}
            </Text>
          </Flex>
        )}
        {!hasVisitButton && data?.address?.street && (
          <Flex>
            <Text fontSize="md" fontWeight="bold">
              Endereço:
            </Text>
            <Text ml={1}>
              {`${data?.address.street}, ${data?.address.number} -
              ${data?.address.district}`}
            </Text>
          </Flex>
        )}

        {!hasVisitButton &&
          data?.phones &&
          data.phones.map((phone) =>
            phone.is_whatsapp ? (
              <Flex>
                <Text fontSize="md" fontWeight="bold" mt={3}>
                  Whatsapp:
                </Text>
                <Tooltip
                  label="Clique para enviar uma mensagem!"
                  aria-label="A tooltip"
                >
                  <Link
                    isExternal
                    href={`https://wa.me/55${phone.number}?text=Olá!%20quero%20ajudar%20sua%20no%20organização`}
                  >
                    <Text
                      ml={1}
                      bg="transparent"
                      as={InputMask}
                      mask="(99)9 9999 9999"
                      value={phone.number}
                      w={130}
                    />

                    <Icon as={RiWhatsappFill} color="#25D366" fontSize={30} />
                  </Link>
                </Tooltip>
              </Flex>
            ) : (
              <Flex>
                <Text fontSize="md" fontWeight="bold">
                  Telefone:
                </Text>
                <Text
                  ml={1}
                  bg="transparent"
                  as={InputMask}
                  mask="(99) 9999 9999"
                  value={phone.number}
                  w={130}
                />
              </Flex>
            )
          )}

        <Flex justify="center">
          {isResponsible && (
            <Link href={`/organizations/edit/${data?.id}`}>
              <Tag mt={8} ml={3} colorScheme="yellow">
                Editar dados
              </Tag>
            </Link>
          )}
        </Flex>
      </Stack>

      <Image
        ml="10px"
        boxSize="250px"
        objectFit="cover"
        borderRadius="10"
        src={
          data?.avatar
            ? `${process.env.NEXT_PUBLIC_AWS_BUCKET_URL}/avatar/${data?.avatar}`
            : "/images/responsible.svg"
        }
        alt={data?.name}
      />
    </HStack>
  );
}
