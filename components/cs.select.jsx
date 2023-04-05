import { FormErrorMessage, FormLabel, FormControl } from "@chakra-ui/react"
import { Controller } from "react-hook-form"
import Select from "react-select"

const CsSelect = ({
  name,
  errors,
  control,
  label = "Label",
  isLabeled = true,
  placeholder = "Please input here",
  options = [],
  customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: errors ? "#e53e3e" : "#E2E8F0",
      borderWidth: errors ? "2px" : "1px",
      height: "2.5rem",
      minHeight: "2.5rem",
      borderRadius: "0.375rem",
      ":hover": {
        borderColor: "#CDD5E0",
      },
    }),
  },
}) => {
  return (
    <>
      <FormControl isInvalid={errors}>
        {isLabeled === true ? (
          <FormLabel htmlFor={name}>{label}</FormLabel>
        ) : null}
        <Controller
          id={name}
          name={name}
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Select
              placeholder={placeholder}
              options={options}
              onBlur={onBlur}
              onChange={(selectedOption) => {
                onChange(selectedOption.value)
              }}
              value={options.find((option) => option.value === value)}
              styles={customStyles}
              menuPosition="fixed"
            />
          )}
        />
        <FormErrorMessage>{errors && errors.message}</FormErrorMessage>
      </FormControl>
    </>
  )
}

export default CsSelect
