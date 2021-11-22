import styles from "./CartDetails.module.css";
import Image from "next/image";
import { useShoppingCart } from "use-shopping-cart";

const CartDetails = () => {
  const { removeItem, cartDetails } = useShoppingCart();

  const entries = [];
  for (const id in cartDetails) {
    const entry = cartDetails[id];
    entries.push(
      <article key={entry.id} className={styles.product}>
        <div className={styles.imageWrapper}>
          <Image
            className={styles.image}
            src={entry.image}
            layout='fill'
            sizes='20vw'
            alt={entry.name}
          />
        </div>
        <section className={styles.productInfo}>
          <p>{entry.name}</p>
          <p className={styles.price}>{entry.formattedValue}</p>

          {/* Removes the item from the cart */}
          <button
            className={styles.removeProduct}
            onClick={() => removeItem(id)}
            aria-label={`Remove ${entry.name} from your cart`}
          >
            Remove
          </button>
        </section>
      </article>
    );
  }

  if (entries.length) return entries;
  return <p className={styles.noItems}>Your shopping bag is empty</p>;
};

export default CartDetails;
