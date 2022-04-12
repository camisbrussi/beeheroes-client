import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  Textarea as ChakraTextarea,
  TextareaProps as ChakraTextareaProps,
  FormErrorMessage,
  Text,
  Flex,
} from "@chakra-ui/react";

interface TextareaProps extends ChakraTextareaProps {
  name: string;
  label?: string;
  error?: FieldError;
  info?: string;
}

const TextareaBase: ForwardRefRenderFunction<
  HTMLTextAreaElement,
  TextareaProps
> = ({ name, label, error = null, info = null, ...rest }, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && (
        <FormLabel htmlFor={name}>
          <Flex>
            <Text>{label}</Text>
            {!!info && (
              <Text fontSize="xs" m={1}>
                ({info})
              </Text>
            )}
          </Flex>
        </FormLabel>
      )}

      <ChakraTextarea
        name={name}
        id={name}
        focusBorderColor="yellow.400"
        bgColor="blue.50"
        size="lg"
        ref={ref}
        {...rest}
      />
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const Textarea = forwardRef(TextareaBase);
