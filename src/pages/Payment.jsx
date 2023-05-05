import React from "react";
import { getFunctions, httpsCallable } from "firebase/functions";

export const Payment = (props) => {
    const functions = getFunctions();
    const createStripeCheckout = httpsCallable(functions, 'createStripeCheckoutHTTPS4');
    createStripeCheckout({
        lineItems: [
            {
              quantity: 2,
              price_data: {
                currency: "aud",
                unit_amount: 99.99 * 100,
                product_data: {
                  name: "The Lukas Moodysson Collection",
                },
              },
            },
          ],
      })
        .then(result => {
          if (result.data.url) {
            window.location.assign(result.data.url)
          }
          const sessionId = result.data.id
        
        })
        .catch(error => {
          // Handle any errors from the Cloud Function here
          console.error(error);
        });
    return (
      <div>Payment</div>
    )
 }  

 