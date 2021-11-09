import React, { useState } from "react";

const RadioField = ({
  styles,
  value,
  checked,
  onChange,
  onBlur,
  registerLabel,
  register,
  onClick,
}) => {
  return (
    <label className={styles.radioFormControl} htmlFor={value}>
      <input
        className={`${styles.radioInput}`}
        type='radio'
        /*  tabIndex='0' */
        id={value}
        value={value}
        defaultChecked={checked}
        onChange={onChange}
        {...register(registerLabel)}
        onClick={onClick}
        onBlur={onBlur}
      />
      {value}
    </label>
  );
};

export default RadioField;
