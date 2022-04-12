import {
  Stack,
  Text,
  FormControl,
  Flex,
  CircularProgress,
  CircularProgressLabel,
  Box,
  FormLabel,
  Tooltip,
  FormErrorMessage,
  Icon,
  Avatar,
} from "@chakra-ui/react";
import { AxiosRequestConfig } from "axios";
import { constants } from "buffer";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { FiAlertCircle, FiPlus } from "react-icons/fi";
import { api } from "../../services/apiCLient";

export default function CreateUser({
  register,
  errors,
  setValue,
  setError,
  name,
  getValues = null,
}) {
  const avatarValue = getValues ? getValues("avatarUser") : null;
  const [progress, setProgress] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    avatarValue &&
      setAvatarUrl(
        `${process.env.NEXT_PUBLIC_AWS_BUCKET_URL}/avatar/${avatarValue}`
      );
  }, [getValues, avatarValue]);
  const handleImageUpload = useCallback(
    async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
      if (!event.target.files?.length) {
        return;
      }
      try {
        const formData = new FormData();
        formData.append("avatar", event.target.files[0]);
        formData.append("file", "avatar");

        const config = {
          headers: { "content-type": "multipart/form-data" },
          onUploadProgress: (e: ProgressEvent) => {
            setProgress(Math.round((e.loaded * 100) / e.total));
          },
        } as AxiosRequestConfig;

        const response = await api.post("/avatar", formData, config);
        setValue(name, response.data);

        setAvatarUrl(
          `${process.env.NEXT_PUBLIC_AWS_BUCKET_URL}/avatar/${response.data}`
        );
      } catch (err) {
        if (err?.message === "Cancelled image upload.") return;

        setError("Falha no envio", {
          type: "manual",
          message: "Ocorreu um erro ao realizar o upload da sua imagem ",
        });
      } finally {
        setIsSending(false);
        setProgress(0);
      }
    },
    [name, setError, setValue]
  );
  return (
    <Stack>
      <FormControl isInvalid={!!errors}>
        <FormLabel
          mx="auto"
          w={40}
          h={40}
          htmlFor={name}
          cursor={isSending ? "progress" : "pointer"}
          opacity={isSending ? 0.5 : 1}
        >
          {avatarUrl && !isSending ? (
            <Stack alignItems="center">
              <Text>Alterar Imagem</Text>
              <Avatar size="2xl" objectFit="cover" src={avatarUrl} />
            </Stack>
          ) : (
            <Flex
              w="full"
              h="full"
              flexDir="column"
              justifyContent="center"
              alignItems="center"
              borderRadius="md"
              bgColor="pGray.800"
              color="pGray.200"
              borderWidth={errors?.avatar && 2}
              borderColor={errors?.avatar && "red.500"}
            >
              {isSending ? (
                <>
                  <CircularProgress
                    trackColor="pGray.200"
                    value={progress}
                    color="orange.500"
                  >
                    <CircularProgressLabel>{progress}%</CircularProgressLabel>
                  </CircularProgress>
                  <Text as="span" pt={2} textAlign="center">
                    Enviando...
                  </Text>
                </>
              ) : (
                <Box pos="relative" h="full">
                  {errors.avatar && (
                    <Tooltip label={errors.avatar} bg="red.500">
                      <FormErrorMessage
                        pos="absolute"
                        right={2}
                        top={2}
                        mt={0}
                        zIndex="tooltip"
                      >
                        <Icon as={FiAlertCircle} color="red.500" w={4} h={4} />
                      </FormErrorMessage>
                    </Tooltip>
                  )}

                  <Flex
                    h="full"
                    alignItems="center"
                    justifyContent="center"
                    flexDir="column"
                  >
                    <Icon as={FiPlus} w={14} h={14} />
                    <Text as="span" pt={2} textAlign="center">
                      Adicione uma foto de perfil
                    </Text>
                  </Flex>
                </Box>
              )}
            </Flex>
          )}
          <input
            data-testid={name}
            disabled={isSending}
            id={name}
            name={name}
            type="file"
            style={{
              display: "none",
            }}
            {...(register(name),
            {
              onChange: (e) => handleImageUpload(e),
            })}
          />
        </FormLabel>
      </FormControl>
    </Stack>
  );
}
