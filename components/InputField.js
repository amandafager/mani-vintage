import React from "react";
import { useForm } from "react-hook-form";

const InputField = ({
  styles,
  label,
  name,
  onChange,
  onBlur,
  register,
  required,
  type,
  registerLabel,
  placeholder,
  error,
}) => {
  return (
    <label htmlFor={label} className={styles.inputField}>
      {label}
      <input
        type={type}
        id={label}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        onBlur={onBlur}
        {...register(registerLabel, { required })}
      />
      <span>{placeholder}</span>
      <p className={styles.errorMessages}>{error}</p>
    </label>
  );
};

export default InputField;
