import { buffer } from "micro";
import Stripe from "stripe";
import { sanityClientUpdate } from "../../../lib/sanity.server";
require("dotenv").config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2020-03-02",
});

//const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const webhookSecret = "whsec_5hgutTZq9v3TS1v7Nv8xBQwhr8WCkteU";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err) {
      console.log(`❌ Error message: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Successfully constructed event.
    console.log("✅ Success:", event.id);

    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object;
      console.log(`💰 PaymentIntent status: ${paymentIntent.status}`);
    } else if (event.type === "payment_intent.payment_failed") {
      const paymentIntent = event.data.object;
      console.log(
        `❌ Payment failed: ${paymentIntent.last_payment_error?.message}`
      );
    } else if (event.type === "checkout.session.completed") {
      const checkout = event.data.object;
      console.log(`checkout session completed: ${checkout.id}`);

      const checkout_session = await stripe.checkout.sessions.retrieve(
        checkout.id,
        {
          expand: ["line_items.data.price.product"],
        }
      );

      const line_items = checkout_session.line_items.data;

      line_items.map((li) => {
        sanityClientUpdate
          .patch(li.price.product.metadata.id)
          .set({ available: false, quantity: 0 })
          .commit()
          .then((res) => {
            console.log("Hurray, the product is updated! New document:");
            console.log(res);
          })
          .catch((err) => {
            console.error("Oh no, the update failed: ", err.message);
          });

        console.log("products: " + li.price.product.metadata.id);
      });
      res.status(200).json(line_items);
    } else if (event.type === "charge.succeeded") {
      const charge = event.data.object;
      console.log(`💵 Charge id: ${charge.id}`);
    } else {
      console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
