import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  Select as SelectInput,
  SelectProps as ChakraSelectProps,
  FormErrorMessage,
  Spinner,
} from "@chakra-ui/react";

interface dataOptions {
  id: string;
  name: string;
  color?: string;
}

interface SelectProps extends ChakraSelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  error?: FieldError;
  data?: dataOptions[];
  disabled?: boolean;
}

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = (
  {
    name,
    placeholder = null,
    error = null,
    label = null,
    data,
    disabled = false,
    ...rest
  },
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!placeholder && <FormLabel htmlFor={name}>{label}</FormLabel>}

      {data ? (
        <SelectInput
          name={name}
          id={name}
          focusBorderColor="yellow.400"
          bgColor="blue.50"
          placeholder={placeholder}
          size="lg"
          disabled={disabled}
          ref={ref}
          {...rest}
        >
          {data?.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
          {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
        </SelectInput>
      ) : (
        <Spinner />
      )}
    </FormControl>
  );
};

export const Select = forwardRef(SelectBase);
