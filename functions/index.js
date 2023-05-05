const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.createStripeCheckout =
functions.https.onCall(async (data, context) => {
  const stripe = require("stripe")(functions.config().stripe.secret_key);
  const lineItems = data.lineItems;
  const successUrl = data.successUrl;
  const cancelUrl = data.cancelUrl;
  const customer = data.customer;
  const uid = data.uid;
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
      line_items: lineItems,
      customer: customer,
      client_reference_id: uid,
    });
    return {id: session.id, url: session.url};
  } catch (error) {
    return {error: error.message};
  }
});
exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
  const stripe = require("stripe")(functions.config().stripe.secret_key);
  let event;
  try {
    const whSec = functions.config().stripe.payments_webhook_secret;
    event = stripe.webhooks.constructEvent(
        req.rawBody,
        req.headers["stripe-signature"],
        whSec,
    );
  } catch (error) {
    console.error("Webhook signature verification failed.");
    return res.sendStatus(400);
  }
  const dataObject = event.data.object;
  const successUrl = dataObject.success_url;
  const orderId = successUrl.split("/").pop();
  let uid = dataObject.client_reference_id;
  const docRef = admin.firestore().collection("customers").doc(uid);
  const doc = await docRef.get();
  let cartItems = null;
  let address = null;
  if (doc.exists) {
    const data = doc.data();
    cartItems = data.cart.cartItems;
    address = data.preliminaryOrder.address;
  } else {
    uid = null;
  }
  await admin.firestore().collection("orders").doc(orderId).set({
    id: orderId,
    uid: uid,
    checkoutSessionId: dataObject.id,
    paymentStatus: dataObject.payment_status,
    amountTotal: dataObject.amount_total/100,
    items: cartItems,
    address: address,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });
  const result = await docRef.update({
    preliminaryOrder: null,
    checkoutSessionId: dataObject.id,
    cart: {
      cartItems: [],
      totalAmount: 0,
      totalQuantity: 0,
    },
  });
  if (result.writeTime) {
    console.log("Customer updated successfully.");
  } else {
    console.log("Failed to update Customer.");
  }
});
