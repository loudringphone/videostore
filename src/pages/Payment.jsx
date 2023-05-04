import React from "react";
import { useFunctionsCall } from "@react-query-firebase/functions";
import { functions } from "../firebase_setup/firebase";
import { getFunctions, httpsCallable } from "firebase/functions";

export const Payment = (props) => {
    const functions = getFunctions();
    const createStripeCheckout = httpsCallable(functions, 'createStripeCheckout');
    // const createStripeCheckout = useFunctionsCall(functions, "createStripeCheckout");
    createStripeCheckout({
        quantity: 1,
           
              currency: 'AUD',
              unit_amount: 100 * 100,
              
                name: 'test',
    })
    return (
      <div>Payment</div>
    )
 }  

 