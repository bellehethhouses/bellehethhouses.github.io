import { TextField } from "@material-ui/core";
import { useController } from "react-hook-form";

export const RHFTextField = (props) => {
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
    <TextField
      fullWidth
      className={props.className}
      error={invalid}
      helperText={error ? error.message : ""}
      onChange={onChange} // send value to hook form
      onBlur={onBlur} // notify when input is touched/blur
      value={value} // input value
      name={name} // send down the input name
      inputRef={ref} // send input ref, so we can focus on input when
      defaultValue={""}
      label={props.label}
      variant="outlined"
    />
  );
};
