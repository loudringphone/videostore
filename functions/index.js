const functions = require("firebase-functions");

exports.createStripeCheckout = functions.https.onCall(async (data, context) => {
  const stripe = require("stripe")(functions.config().stripe.secret_key);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: "https://videostore.netlify.app/account",
    cancel_url: "https://videostore.netlify.app/cart",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "aud",
          unit_amount: (100) * 100,
          product_data: {
            name: "Test product",
          },
        },
      },
    ],
  });
  return {
    id: session.id,
  };
});
