import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";

import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Icon,
  Image,
  Text,
  FormControl,
  FormLabel,
  Flex,
  Tooltip,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FiAlertCircle, FiPlus } from "react-icons/fi";

interface FileInputProps {
  name: string;
  label?: string;
  error?: FieldError;
  mask?: string;
  localImageUrl?: string;
  isSending: boolean;
  progress: number;
}

const FileInputBase: ForwardRefRenderFunction<
  HTMLInputElement,
  FileInputProps
> = (
  {
    name,
    label,
    error = null,
    mask = null,
    localImageUrl,
    isSending,
    progress,
    ...rest
  },
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel
        mx="auto"
        w={40}
        h={40}
        htmlFor={name}
        cursor={isSending ? "progress" : "pointer"}
        opacity={isSending ? 0.5 : 1}
      >
        {localImageUrl && !isSending ? (
          <Image
            w="full"
            h="full"
            src={localImageUrl}
            alt="Uploaded photo"
            borderRadius="md"
            objectFit="cover"
          />
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
            borderWidth={error?.message && 2}
            borderColor={error?.message && "red.500"}
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
                {!!error && (
                  <Tooltip label={error.message} bg="red.500">
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
                    Adicione sua imagem
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
          ref={ref}
          type="file"
          style={{
            display: "none",
          }}
          {...rest}
        />
      </FormLabel>
    </FormControl>
  );
};

export const FileInput = forwardRef(FileInputBase);
