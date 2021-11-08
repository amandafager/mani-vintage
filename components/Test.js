import React from "react";

const Test = React.forwardRef(({ styles, value, checked, onChange }, ref) => (
  <div
    className={`${styles.radioContainer} ${checked ? styles.ischecked : ""}`}
  >
    <input
      className={styles.radioInput}
      type='radio'
      value={value}
      checked={checked}
      onChange={onChange}
      {...register(registerLabel)}
    />
    <label>{value}</label>
  </div>
));

/* const Test = ({
  styles,
  value,
  checked,
  onChange,
  registerLabel,
  register,
}) => {
  return (
    <div
      className={`${styles.radioContainer} ${checked ? styles.ischecked : ""}`}
    >
      <input
        className={styles.radioInput}
        type='radio'
        value={value}
        checked={checked}
        onChange={onChange}
        {...register(registerLabel)}
      />
      <label>{value}</label>
    </div>
  );
}; */

export default Test;
