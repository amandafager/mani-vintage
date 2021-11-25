const validateCartItems =
  require("use-shopping-cart/utilities").validateCartItems;

require("dotenv").config();

import Stripe from "stripe";
import { sanityClient } from "../../../lib/sanity.server";
import { GetAllProductsForCart } from "../../../lib/queries";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2020-03-02",
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Validate the cart details that were sent from the client.
      const cartItems = req.body;

      //Sanity client performs productQuery
      let sanityData = await sanityClient.fetch(GetAllProductsForCart);

      // The POST request is then validated against the data from Sanity.
      for (const id in cartItems) {
        const entry = cartItems[id];
        const inventoryItem = sanityData.find((currentProduct) => {
          return currentProduct.id === id;
        });

        if (inventoryItem === undefined) {
          throw new Error(`${entry.name} is not in stock`);
        }

        if (entry.quantity !== inventoryItem.quantity) {
          res.status(500).json({
            statusCode: 500,
            message:
              inventoryItem.quantity !== 0
                ? `${entry.name} is not enough in stock (only ${inventoryItem.quantity} available).`
                : `${entry.name} is not in stock.`,
            validQuantity: inventoryItem.quantity,
          });
        }
      }

      let line_items;
      try {
        line_items = validateCartItems(sanityData, cartItems);
      } catch (err) {
        res.status(500).json({
          statusCode: 500,
          error: err.message,
          message: "Some of the items in your cart are invalid.",
        });
      }

      // Create Checkout Sessions from body params.
      const params = {
        mode: "payment",
        submit_type: "pay",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_address_collection: {
          allowed_countries: ["SE"],
        },
        //The validated cart items are inserted.
        line_items,
        success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cart/?canceled=true`,
        expires_at: Math.floor(Date.now() / 1000) + 3600 * 2, // Configured to expire after 2 hours
      };
      const checkoutSession = await stripe.checkout.sessions.create(params);

      res.status(200).json({
        checkoutSession: checkoutSession,
        cartItems: line_items,
        sanityData: sanityData,
      });
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
