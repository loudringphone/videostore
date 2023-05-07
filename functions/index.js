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
    let session;
    if (customer === null || uid === null) {
      session = await stripe.checkout.sessions.create({
        mode: "payment",
        allow_promotion_codes: true,
        success_url: successUrl,
        cancel_url: cancelUrl,
        line_items: lineItems,
        client_reference_id: "anonymous customer",
      });
    } else {
      session = await stripe.checkout.sessions.create({
        mode: "payment",
        allow_promotion_codes: true,
        success_url: successUrl,
        cancel_url: cancelUrl,
        line_items: lineItems,
        customer: customer,
        client_reference_id: uid,
      });
    }
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
    console.log("headers", req.headers);
  } catch (error) {
    console.error(error, "Webhook signature verification failed.",
        req.rawBody, req.headers["stripe-signature"]);
    return res.sendStatus(400);
  }
  const dataObject = event.data.object;
  const currentTime = Math.floor(Date.now() / 1000);
  if (dataObject.payment_status === "paid" &&
   currentTime <= dataObject.created + 5 * 60) {
    const uid = dataObject.client_reference_id;
    const docRef = admin.firestore().collection("customers").doc(uid);
    const doc = await docRef.get();
    let checkoutCartItems;
    let shippingAddress;
    let addresses;
    if (doc.exists) {
      const data = doc.data();
      checkoutCartItems = data.checkoutCartItems;
      shippingAddress = data.addresses[data.addresses.selected];
      addresses = data.addresses;
      addresses["selected"] = addresses["default"];
    } else {
      console.error("Customer does not exist for uid:", uid);
    }
    await admin.firestore().collection("orders").doc().set({
      uid: uid,
      checkoutSessionId: dataObject.id,
      paymentStatus: dataObject.payment_status,
      amountTotal: dataObject.amount_total/100,
      discount: dataObject.total_details.amount_discount/100,
      items: checkoutCartItems,
      address: shippingAddress,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    const result = await docRef.update({
      checkoutSessionId: dataObject.id,
      checkoutCartItems: null,
      addresses: addresses,
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
  }
  res.sendStatus(200);
});
