import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
} from "@chakra-ui/react"

const CsInput = ({
  errors,
  register,
  label = "Label",
  isLabeled = true,
  placeholder = "Please input here",
}) => {
  return (
    <>
      <FormControl isInvalid={errors}>
        {isLabeled === true ? (
          <FormLabel htmlFor={register.name}>{label}</FormLabel>
        ) : null}

        <Input id={register.name} placeholder={placeholder} {...register} />
        <FormErrorMessage>{errors && errors.message}</FormErrorMessage>
      </FormControl>
    </>
  )
}

export default CsInput
