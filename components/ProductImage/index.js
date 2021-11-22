import styles from "./ProductImage.module.css";
import Image from "next/image";

const ProductImage = ({ url, alt, name, sizes }) => {
  return (
    <div className={styles.imageWrapper}>
      <Image
        className={styles.image}
        src={url}
        layout='fill'
        sizes={sizes}
        /* sizes='20vw' */
        alt={alt ? alt : name}
      />
    </div>
  );
};

export default ProductImage;
