import styles from "./TextBlock.module.css";

const TextBlock = ({ heading, body }) => {
  return (
    <div className={styles.block}>
      <h2 className={styles.heading}>{heading}</h2>
      <p className={styles.body}>{body}</p>
    </div>
  );
};

export default TextBlock;
