const functions = require("firebase-functions");
const stripe = require("stripe")(functions.config().stripe.secret_key);
const cors = require("cors")({origin: true});

exports.createStripeCheckout =
functions.https.onRequest(async (request, response) => {
  cors(request, response, async () => {
    const data = request.body;
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        success_url: "https://videostore.netlify.app/account",
        cancel_url: "https://videostore.netlify.app/cart",
        line_items: [
          {
            quantity: data.quantity,
            price_data: {
              currency: data.currency,
              unit_amount: data.unit_amount,
              product_data: {
                name: data.product_name,
              },
            },
          },
        ],
      });
      response.status(200).json({id: session.id});
    } catch (error) {
      response.status(500).json({error: error.message});
    }
  });
});
