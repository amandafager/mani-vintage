import React, { useState, useEffect } from "react";
import styles from "./CartSummary.module.css";
import { useShoppingCart } from "use-shopping-cart";
import { fetchPostJSON } from "@utils/apiHelpers";
import getStripe from "@lib/stripe/getStripe";
import CartDetails from "@components/CartDetails";
import Button from "@components/Button";

const CartSummary = () => {
  //setting up some React states for our cart
  const [loading, setLoading] = useState(false);
  const [cartEmpty, setCartEmpty] = useState(true);
  const [error, setError] = useState("");
  // destructuring all the building blocks we get from use-shopping-cart
  const {
    formattedTotalPrice,
    cartCount,
    clearCart,
    cartDetails,
    redirectToCheckout,
    setItemQuantity,
    removeItem,
  } = useShoppingCart();

  //sets our cartEmpty state with cart data
  useEffect(() => setCartEmpty(!cartCount), [cartCount]);

  const handleCheckout = async (event) => {
    event.preventDefault();
    setLoading(true);
    //send the cart data to our serverless API

    const response = await fetchPostJSON(
      "/api/checkout_sessions/cart",
      cartDetails
    );

    if (response.validQuantity) {
      setLoading(false);
      console.log(response.validQuantity);
      for (const id in cartDetails) {
        setItemQuantity(id, response.validQuantity);
      }
    }

    console.log(response);

    if (response.statusCode === 500) {
      console.error(response.message);
      setLoading(false);
      setError(response.message);
      return;
    }

    const stripe = await getStripe();

    const { error } = await stripe.redirectToCheckout({
      sessionId: response.checkoutSession.id,
    });

    //redirectToCheckout({ sessionId: response.id });
  };

  return (
    <>
      <div className={styles.cartSummary}>
        <section className={styles.cartSection}>
          <h1 className={styles.heading}>Shopping bag</h1>
          <CartDetails />
        </section>

        <section className={styles.cartSection}>
          <h2 className={styles.heading}>Bag total</h2>
          <form onSubmit={handleCheckout}>
            <p className={styles.error}>{error}</p>
            <p suppressHydrationWarning className={styles.cartDetail}>
              Number of Items: <span>{cartCount}</span>
            </p>
            <p suppressHydrationWarning className={styles.cartDetail}>
              Delivery: <span>Free</span>
            </p>
            <p suppressHydrationWarning className={styles.cartDetail}>
              Total:
              <strong className={styles.price}>{formattedTotalPrice}</strong>
            </p>
            <p>
              Use 4242 4242 4242 4242 as the card number on this test vesion.
            </p>
            <Button
              text='Checkout'
              type='submit'
              disabled={cartEmpty || loading}
            />
            {/* <Button text='Clear Cart' type='button' onClick={clearCart} /> */}
          </form>
        </section>
      </div>
    </>
  );
};

export default CartSummary;
