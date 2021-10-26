import Image from "next/image";
import styles from "../styles/ProductCard.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

const ProductCard = ({ product, pageCategorySlug }) => {
  const { title, price, imageUrl, imageAlt, slug, categories } = product;

  const router = useRouter();
  const { categoryslug } = router.query;

  let categorySlugToReturn;

  const foundCatgeorySlug = categories.find(
    (category) => category.slug !== "all" && category.slug !== "new-arrivals"
  );

  if (categoryslug === "all" || categoryslug === "new-arrivals") {
    categorySlugToReturn = foundCatgeorySlug && foundCatgeorySlug.slug;
  } else {
    categorySlugToReturn = pageCategorySlug;
  }

  return (
    <div className={styles.card}>
      <Link
        href={{
          pathname: "/[categoryslug]/[slug]",
          query: {
            categoryslug: categorySlugToReturn,
            slug: slug,
          },
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
