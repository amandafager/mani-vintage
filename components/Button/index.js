import styles from "./Button.module.css";

const Button = ({ text, type, disabled, onClick }) => {
  return (
    <button
      className={styles.button}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
