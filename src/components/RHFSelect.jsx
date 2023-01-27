import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { useController } from "react-hook-form";

export const RHFSelect = (props) => {
  const {
    field: { onChange, onBlur, name, value, ref },
    fieldState: { invalid, isTouched, isDirty, error },
    formState: { touchedFields, dirtyFields },
  } = useController({
    name: props.name,
    control: props.control,
    rules: props.rules,
    defaultValue: "",
  });

  return (
    <FormControl className={props.className} variant="outlined" error={invalid}>
      <InputLabel>{props.label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label={props.label}
        onChange={onChange}
        onBlur={onBlur}
        inputRef={ref}
        name={name}
        error={invalid}
        helperText={error ? error.message : ""}
        variant="outlined"
      >
        {props.options.map((option, i) => (
          <MenuItem key={i} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
  );
};
