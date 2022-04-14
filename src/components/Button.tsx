import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from "@chakra-ui/react";

interface ref extends ChakraButtonProps {
  title: string;
}

export function Button({ title, ...rest }: ChakraButtonProps) {
  return (
    <ChakraButton colorScheme="yellow" size="lg" color="brown.600" {...rest}>
      {title}
    </ChakraButton>
  );
}
