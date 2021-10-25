import Image from "next/image";
import styles from "../styles/ProductCard.module.css";
import { urlFor } from "@utils/api";
import Link from "next/link";

const ProductCard = ({ product, categoryslug }) => {
  const { title, price, imageUrl, imageAlt, slug } = product;

  return (
    <div className={styles.card}>
      <Link
        href={{
          pathname: "/[categoryslug]/[slug]",
          query: { categoryslug: categoryslug, slug: slug },
        }}
      >
        <a>
          <div className={styles.imageWrapper}>
            <Image
              className={styles.image}
              src={imageUrl}
              layout='fill'
              alt={imageAlt ? imageAlt : title}
              /* layout='responsive'
          width={412}
          height={557} */
            />
          </div>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.price}>{price} SEK</p>
        </a>
      </Link>
    </div>
  );
};

export default ProductCard;
