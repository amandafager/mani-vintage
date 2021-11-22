import styles from "./PageWrapper.module.css";

const PageWrapper = ({ children, addStyles }) => {
  return <div className={`${styles.page} ${addStyles}`}>{children}</div>;
};

export default PageWrapper;
