import { CartProvider } from "use-shopping-cart";
import getStripe from "../lib/stripe/getStripe";

export default function Cart({ children }) {
  return (
    <CartProvider
      cartMode='checkout-session'
      stripe={getStripe()}
      currency={"sek"}
    >
      {children}
    </CartProvider>
  );
}
