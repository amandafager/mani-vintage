import styles from "./ProductImage.module.css";
import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";
import sanityClient from "../../sanity";

const ProductImage = ({ url, alt, name, sizes }) => {
  const imageProps = useNextSanityImage(sanityClient, url);

  return (
    <div className={styles.imageWrapper}>
      <Image
        className={styles.image}
        /* {...imageProps} */
        src={imageProps.src}
        layout='fill'
        /* src={imageProps.src} */
        /* loader={imageProps.loader} */
        /*    layout='responsive' */
        sizes={sizes}
        alt={alt ? alt : name}
      />
      {/*   <Image
        className={styles.image}
        src={url}
        layout='fill'
        sizes={sizes}
        alt={alt ? alt : name}
      /> */}
    </div>
  );
};

export default ProductImage;
